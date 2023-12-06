const typewriter = (node: Element, { speed = 7 }) => {
    const text = node.textContent;
    if (!text) return;

    const duration = text.length / (speed * 0.01);

    return {
        duration,
        tick: (t) => {
            const i = ~~(text.length * t);
            node.innerHTML = `<span class="visible">${text.slice(
                0,
                i,
            )}</span><span class="invisible">${text.slice(i)}</span>`;
        },
    };
};

export default typewriter;