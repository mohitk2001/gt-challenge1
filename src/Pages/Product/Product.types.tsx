export interface IProductTshirt {
    id:number,
    imageURL:string,
    name:string,
    type:string,
    price:number,
    currency:string,
    color:string,
    gender:string,
    quantity:number 
}
export interface Tshirt{
    data:IProductTshirt[],
    isLoading:boolean
  }
export interface IFilter{
    color:string[],
    pricerange:string[],
    type:string[],
    gender:string[]
}
  export interface ISelectedFilter{
    filterType:IFilter[]
  }