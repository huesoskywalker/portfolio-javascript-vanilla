import { portfolioData } from "./portfolioData.js"

export const selectorData = portfolioData.reduce((result, data) => {
    if (!result[data.type]) {
        result[data.type] = []
    }

    if (!result[data.type].includes(data.section)) {
        result[data.type].push(data.section)
    }

    return result
}, {})
