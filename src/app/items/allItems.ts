export const allItems = () => {
  const allItemsData: any = [
    {
      nome: "Cerveja Skol Pilsen Lata 473ml Pack Com 12 unidades",
      id: 1,
      categoria: "bebidas",
      desc: "Cerveja Skol Pilsen Lata 350ml Pack Com 12 unidades está disponível para compra em incrementos de 1",
      preco: "R$ 52,68",
      img: "https://www.amigao.com/media/catalog/product/C/e/Cerveja_Skol_Pilsen_Lata_473ml_Pack_Com_12_unidades_7891149100828_89.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    },
    {
      nome: "Cerveja Antartica Original Pilsen Lata 269ml",
      id: 2,
      desc: "Como toda típica cerveja do tipo pilsen, ANTARCTICA é clara e tem baixa fermentação. Tem aroma, sabor e amargor suaves. É uma clássica cerveja pilsen que combina tradição e qualidade há mais de um século.Leve e Saborosa para celebrar as coisas boas da vida. Antarctica surgiu como uma fábrica de gelo e passou a produzir cerveja um ano depois, em 1889. É o complemento perfeito para momentos de prazer e para descontrair em boa companhia. Seu aroma levemente frutado e o balanço entre a acidez e o dulçor são bastante característicos.",

      categoria: "bebidas",
      preco: "R$ 3,39",
      img: "https://www.amigao.com/media/catalog/product/C/e/Cerveja_Antartica_Original_Pilsen_Lata_269ml_7891991295086_91.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    },
    {
      nome: "Vinho Diablo Dark Red 750ml",
      categoria: "bebidas",
      id: 3,
      desc: "Vinho Diablo Dark Red 750ml está disponível para compra em incrementos de 1",

      preco: "R$ 88,49",
      img: "https://www.amigao.com/media/catalog/product/V/i/Vinho_Diablo_Dark_Red_750ml_7804320746104_98.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    },
    {
      nome: "Suco Purity Nectar Uva 1l",
      categoria: "bebidas",
      id: 4,
      desc: "Suco Purity Nectar Uva 1l está disponível para compra em incrementos de 1",

      preco: "R$ 7,49",
      img: "https://www.amigao.com/media/catalog/product/S/u/Suco_Purity_Nectar_Uva_1l_7897001050096.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    },
    {
      nome: "Água Mineral Crystal Sem Gás 500Ml",
      id: 5,
      desc: "Água Mineral Crystal Sem Gás 500Ml está disponível para compra em incrementos de 1",

      categoria: "bebidas",
      preco: "R$ 2,19",
      img: "https://www.amigao.com/media/catalog/product/_/g/_gua_Mineral_Crystal_Sem_G_s_500Ml_2019_10_18_11_34_53..jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    },
    {
      nome: "Leite Uht Lider Integral 1l",
      id: 6,
      desc: "Leite Uht Lider Integral 1l está disponível para compra em incrementos de 1",

      categoria: "bebidas",
      preco: "R$ 4,99",
      img: "https://www.amigao.com/media/catalog/product/L/e/Leite_Uht_Lider_Integral_1l_7896569405003_48.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    },
    {
      nome: "Cerveja Eisenbahn Pale Ale Lata 350ml",
      id: 7,
      desc: "Cerveja Eisenbahn Pale Ale Lata 350ml está disponível para compra em incrementos de 1",

      categoria: "bebidas",
      preco: "R$ 5,39",
      img: "https://www.amigao.com/media/catalog/product/C/e/Cerveja_Eisenbahn_Pale_Ale_Lata_350ml_7898367984070_41.png?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    },
    {
      nome: "Whisky Old Parr 18 Anos 750ml",
      id: 8,
      desc: "Whisky Old Parr 18 Anos 750ml está disponível para compra em incrementos de 1",

      categoria: "bebidas",
      preco: "R$ 439,90",
      img: "https://www.amigao.com/media/catalog/product/W/h/Whisky_Old_Parr_18_Anos_750ml_5000281055084.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=300&width=240&canvas=240:300",
    },
    {
      nome: "Refrigerante Coca Cola Pet 2l + Coca Cola Sem Açúcar 2l Leve+ Pague-",
      id: 9,
      desc: "Refrigerante Coca Cola Pet 2l + Coca Cola Sem Açúcar 2l Leve+ Pague- está disponível para compra em incrementos de 1",

      categoria: "bebidas",
      preco: "R$ 17,99",
      img: "https://www.amigao.com/media/catalog/product/R/e/Refrigerante_Coca_Cola_Pet_2l_Coca_Cola_Sem_2020_10_26_10_19_39..jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    },
    {
      nome: "Acucar Alto Alegre Demerara 1kg",
      id: 10,
      desc: "Acucar Alto Alegre Demerara 1kg está disponível para compra em incrementos de 1",

      categoria: "Alimentos Básicos",
      preco: "R$ 5,19",
      img: "https://www.amigao.com/media/catalog/product/A/c/Acucar_Alto_Alegre_Demerara_1kg_7896508200119.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    },
    {
      nome: "Farinha de Trigo Coamo 1kg",
      id: 11,
      desc: "Farinha de Trigo Coamo 1kg está disponível para compra em incrementos de 1",

      categoria: "Alimentos Básicos",
      preco: "R$ 3,09",
      img: "https://www.amigao.com/media/catalog/product/F/a/Farinha_Trigo_Coamo_1kg_Especial_7896279600354.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    },
    {
      nome: "Oleo Coco Sococ Extra Virgem 500ml",
      id: 12,
      desc: "Oleo Coco Sococ Extra Virgem 500ml está disponível para compra em incrementos de 1",

      categoria: "Alimentos Básicos",
      preco: "R$ 51,49",
      img: "https://www.amigao.com/media/catalog/product/O/l/Oleo_Coco_Sococ_Extra_Virgem_500ml_2021_08_09_08_56_58..png?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    },
    {
      nome: "Arroz Ramagem Tipo 1 2kg",
      id: 13,
      desc: "Arroz Ramagem Tipo 1 5kg está disponível para compra em incrementos de 1",

      categoria: "Alimentos Básicos",
      preco: "R$ 12,99",
      img: "https://www.amigao.com/media/catalog/product/A/r/Arroz_Ramagem_Tipo_1_2kg_7896864400048.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    },
    {
      nome: "Sal Refinado Cisne 1kg",
      id: 14,
      desc: "Sal Refinado Cisne Light 500g está disponível para compra em incrementos de 1",

      categoria: "Alimentos Básicos",
      preco: "R$ 3,69",
      img: "https://www.amigao.com/media/catalog/product/S/a/Sal_Refinado_Cisne_1kg_7896035210001_44.png?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    },
  ];

  return allItemsData;
};
