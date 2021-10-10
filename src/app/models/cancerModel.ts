// SQL : id, name, cancerAttributesId
export class Cancer {
    constructor(
        public name: string,
        public cancerAttributes: CancerAttributes[]
    ){
    }
}

// SQL : id, name, attributeCategoriesId
export class CancerAttributes{
    constructor(
        public name: string,
        public attributeCategories: string[]
    ){}
}

// SQL : id, name, attributeSubCategoriesId
// export class AttributeCategories{
//     constructor(
//         public name: string,
//         public attributeSubCategories: string[]
//     ){}
// }


var cancerModel = {
    id : 0,
    name: "breast cancer",
    cancerAttributes: [10, 20]
  };

var cancerAttributes = {
    id: 10,
    name: "Patient Char",
    attributeCategories: ["race", "ethnicity"]
  };




  
