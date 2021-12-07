export function clickOutside(node: HTMLElement, opts: { target: HTMLElement }) {
  const handleClickOutside = (e: MouseEvent) => {
    if (
      e.target instanceof Element &&
      node &&
      !opts.target.contains(e.target) &&
      !node.contains(e.target)
    ) {
      node.dispatchEvent(new CustomEvent("clickoutside"));
    }
  };

  document.addEventListener("click", handleClickOutside, {
    capture: true,
    passive: true,
  });

  return {
    destroy() {
      document.removeEventListener("click", handleClickOutside);
    },
  };
}
