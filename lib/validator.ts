export const isValidQuery = (args: Array<string | string[]>): boolean => {
    for (const param of args) {
        if (Array.isArray(param)) {
            throw new Error('Expected a single parameter, not multiple')
        }
    }
    return true
}
