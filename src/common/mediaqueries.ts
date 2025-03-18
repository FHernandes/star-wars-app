export const size = {
    mobile: '480px',
    tablet: '768px',
    desktop: '1200px',
}

const device = {
    mobile: `(max-width: ${size.mobile})`,
    tablet: `(max-width: ${size.tablet})`,
    desktop: `(max-width: ${size.desktop})`,
}

export default device;