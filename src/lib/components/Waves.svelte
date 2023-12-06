<script lang="ts">
    export let layer: number = 0;

    const mapLayerToSvg = {
        0: 300,
        1: 170,
        2: 20,
    }[layer];
</script>

<svg
    width="100%"
    height="100%"
    viewBox="0 0 1000 1000"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    overflow="auto"
    shape-rendering="crispedges"
    style="position: absolute; fill: transparent;"
>
    <defs>
        <path
            id="wavepath"
            d="M 0 2000 0 500 Q 40 278 80 500 t 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0  v1000 z"
        />
        <path id="motionpath" d="M -160 0 0 0" />
    </defs>
    <g>
        <use xlink:href="#wavepath" y={mapLayerToSvg} class="svg layer-{layer}">
            <animateMotion dur="3s" repeatCount="indefinite">
                <mpath xlink:href="#motionpath" />
            </animateMotion>
        </use>
    </g>
</svg>

<style>
    .svg {
        animation: gradient 8s linear infinite;
        filter: blur(2px);
    }

    .layer-1 {
        filter: blur(4px) opacity(0.6);
    }

    .layer-2 {
        filter: blur(6px) opacity(0.2);
    }
</style>
