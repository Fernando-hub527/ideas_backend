export interface IPageableObject<T>{
    toResponse(): object
}

export class PaginationDTO <T>{
    dtoObjects: IPageableObject<T>[]
    page: number
    quantityPerPage: number
    totalPages: number
    totalRecords: number

    constructor(dtoObjects: IPageableObject<T>[], page: number, quantityPerPage: number, totalPages: number, totalRecords: number){
        this.page = page
        this.quantityPerPage = quantityPerPage
        this.totalPages = totalPages
        this.totalRecords = totalRecords
        this.dtoObjects = dtoObjects
    }

    toResponse(){
        const data = this.dtoObjects.map(object => object.toResponse())
        return {
            currentPage: this.page, itemsPerPage: this.quantityPerPage, totalPages: this.totalPages,
            totalItems: this.totalRecords, data: data
        }
    }

}