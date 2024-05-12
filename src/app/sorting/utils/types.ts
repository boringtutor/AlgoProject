export type barNode = {
    type:barType,
    value:number
}

export type barType = "idle"|"comparing"|"sorted"