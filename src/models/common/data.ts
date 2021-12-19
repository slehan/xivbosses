export interface GraphQlResult<T> {
    data: Data<T>
}
export interface Data<T> {
    allDataYaml: AllDataYaml<T>
}

export interface AllDataYaml<T> {
    edges: Edge<T>[]
}

export interface Edge<T> {
    node: T
}
