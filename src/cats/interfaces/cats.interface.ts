export interface CatParam {
  name: string;
  age: number;
}

export interface Cat extends CatParam {
  id: number;
  breed: string;
}
