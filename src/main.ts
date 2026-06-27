import { Plugin, MarkdownView } from 'obsidian';

interface EditMode {
  updateOptions(): void;
}

export default class FixTabSize extends Plugin {
  private patched = false;

  onload() {
    this.registerEvent(this.app.workspace.on('layout-change', () => this.patch()));
  }

  private patch() {
    if (this.patched) return;
    const leaf = this.app.workspace.getLeavesOfType('markdown')
      .find(l => l.view instanceof MarkdownView);
    if (!leaf) return;
    this.patched = true;

    const editMode = (leaf.view as unknown as { editMode: EditMode }).editMode;
    // monkey-patch 3-deep prototype — unavoidably untyped
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
    const proto = Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(editMode)));
    const orig = proto.getDynamicExtensions;

    proto.getDynamicExtensions = function (this: { app: { vault: { getConfig: (key: string) => unknown } } }) {
      const exts: Array<{ value?: string }> = orig.call(this);
      /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
      if (!this.app.vault.getConfig('useTab')) {
        const tabSize = this.app.vault.getConfig('tabSize') as number;
        if (tabSize !== 4) {
          const ext = exts.find(e => e.value === '    ');
          if (ext) ext.value = ' '.repeat(tabSize);
        }
      }
      return exts;
    };

    for (const l of this.app.workspace.getLeavesOfType('markdown')) {
      if (l.view instanceof MarkdownView) {
        (l.view as unknown as { editMode: EditMode }).editMode.updateOptions();
      }
    }
  }
}
