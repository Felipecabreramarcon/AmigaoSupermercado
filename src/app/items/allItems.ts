export const allItems = () => {
  const allItemsData: any = [
    {
      nome: "Cerveja Skol Pilsen Lata 473ml Pack Com 12 unidades",
      id: 1,
      categoria: "Bebidas",
      desc: "Cerveja Skol Pilsen Lata 350ml Pack Com 12 unidades está disponível para compra em incrementos de 1",
      preco: "R$ 52,68",
      img: "https://www.amigao.com/media/catalog/product/C/e/Cerveja_Skol_Pilsen_Lata_473ml_Pack_Com_12_unidades_7891149100828_89.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    },
    {
      nome: "Cerveja Antartica Original Pilsen Lata 269ml",
      id: 2,
      desc: "Como toda típica cerveja do tipo pilsen, ANTARCTICA é clara e tem baixa fermentação. Tem aroma, sabor e amargor suaves. É uma clássica cerveja pilsen que combina tradição e qualidade há mais de um século.Leve e Saborosa para celebrar as coisas boas da vida. Antarctica surgiu como uma fábrica de gelo e passou a produzir cerveja um ano depois, em 1889. É o complemento perfeito para momentos de prazer e para descontrair em boa companhia. Seu aroma levemente frutado e o balanço entre a acidez e o dulçor são bastante característicos.",

      categoria: "Bebidas",
      preco: "R$ 3,39",
      img: "https://www.amigao.com/media/catalog/product/C/e/Cerveja_Antartica_Original_Pilsen_Lata_269ml_7891991295086_91.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    },
    {
      nome: "Vinho Diablo Dark Red 750ml",
      categoria: "Bebidas",
      id: 3,
      desc: "Vinho Diablo Dark Red 750ml está disponível para compra em incrementos de 1",

      preco: "R$ 88,49",
      img: "https://www.amigao.com/media/catalog/product/V/i/Vinho_Diablo_Dark_Red_750ml_7804320746104_98.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    },
    {
      nome: "Suco Purity Nectar Uva 1l",
      categoria: "Bebidas",
      id: 4,
      desc: "Suco Purity Nectar Uva 1l está disponível para compra em incrementos de 1",

      preco: "R$ 7,49",
      img: "https://www.amigao.com/media/catalog/product/S/u/Suco_Purity_Nectar_Uva_1l_7897001050096.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    },
    {
      nome: "Água Mineral Crystal Sem Gás 500Ml",
      id: 5,
      desc: "Água Mineral Crystal Sem Gás 500Ml está disponível para compra em incrementos de 1",

      categoria: "Bebidas",
      preco: "R$ 2,19",
      img: "https://www.amigao.com/media/catalog/product/_/g/_gua_Mineral_Crystal_Sem_G_s_500Ml_2019_10_18_11_34_53..jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    },
    {
      nome: "Leite Uht Lider Integral 1l",
      id: 6,
      desc: "Leite Uht Lider Integral 1l está disponível para compra em incrementos de 1",

      categoria: "Bebidas",
      preco: "R$ 4,99",
      img: "https://www.amigao.com/media/catalog/product/L/e/Leite_Uht_Lider_Integral_1l_7896569405003_48.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    },
    {
      nome: "Cerveja Eisenbahn Pale Ale Lata 350ml",
      id: 7,
      desc: "Cerveja Eisenbahn Pale Ale Lata 350ml está disponível para compra em incrementos de 1",

      categoria: "Bebidas",
      preco: "R$ 5,39",
      img: "https://www.amigao.com/media/catalog/product/C/e/Cerveja_Eisenbahn_Pale_Ale_Lata_350ml_7898367984070_41.png?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    },
    {
      nome: "Whisky Old Parr 18 Anos 750ml",
      id: 8,
      desc: "Whisky Old Parr 18 Anos 750ml está disponível para compra em incrementos de 1",

      categoria: "Bebidas",
      preco: "R$ 439,90",
      img: "https://www.amigao.com/media/catalog/product/W/h/Whisky_Old_Parr_18_Anos_750ml_5000281055084.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=300&width=240&canvas=240:300",
    },
    {
      nome: "Refrigerante Coca Cola Pet 2l + Coca Cola Sem Açúcar 2l Leve+ Pague-",
      id: 9,
      desc: "Refrigerante Coca Cola Pet 2l + Coca Cola Sem Açúcar 2l Leve+ Pague- está disponível para compra em incrementos de 1",

      categoria: "Bebidas",
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
    {
      nome: "Sabonete Rexona Bamboo Fresh 84g",
      id: 15,
      desc: "Sabonete Rexona Bamboo Fresh 84g está disponível para compra em incrementos de 1",

      categoria: "Higiene e Beleza",
      preco: "R$ 3,79",
      img: "https://www.amigao.com/media/catalog/product/S/a/Sabonete_Rexona_Bamboo_Fresh_84g_7891150024816_61.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    }, {
      nome: "Creme Facial Bb Cream Base Clara Fps20 30ml",
      id: 16,
      desc: "Creme Facial Bb Cream Base Clara Fps20 30ml está disponível para compra em incrementos de 1",

      categoria: "Higiene e Beleza",
      preco: "R$ 56,90",
      img: "https://www.amigao.com/media/catalog/product/C/r/Creme_Facial_Bb_Cream_Base_Clara_Fps20_30ml_7899706149570_16.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=300&width=240&canvas=240:300",
    },
    {
      nome: "Desodorante Nivea Aerossol Men Dry Impact 150ml Com 2 Unidades",
      id: 17,
      desc: "Desodorante Nivea Aerossol Men Dry Impact 150ml Com 2 Unidades está disponível para compra em incrementos de 1",

      categoria: "Higiene e Beleza",
      preco: "R$ 26,24",
      img: "https://www.amigao.com/media/catalog/product/D/e/Desodorante_Nivea_Aerossol_Men_Dry_Impact_150_2019_07_23_16_16_03..png?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    }, {
      nome: "Shampoo Head Shoulders Anticaspa Men 3x1 400ml",
      id: 18,
      desc: "Shampoo Head Shoulders Anticaspa Men 3x1 400ml está disponível para compra em incrementos de 1",

      categoria: "Higiene e Beleza",
      preco: "R$ 29,90",
      img: "https://www.amigao.com/media/catalog/product/S/h/Shampoo_Head_Shoulders_Anticaspa_Men_3x1_400m_2022_07_04_14_54_22._1.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    }, {
      nome: "Condicionador Tra La La Kids Hidra Musical 480ml",
      id: 19,
      desc: "Condicionador Tra La La Kids Hidra Musical 480ml está disponível para compra em incrementos de 1",

      categoria: "Higiene e Beleza",
      preco: "R$ 18,99",
      img: "https://www.amigao.com/media/catalog/product/C/o/Condicionador_Tra_La_La_Kids_Hidra_Musical_48_2022_03_08_11_29_47..jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    }, {
      nome: "Creme Pentear Pantene Hidro Cauterização 240ml",
      id: 20,
      desc: "Creme Pentear Pantene Hidro Cauterização 240ml está disponível para compra em incrementos de 1",

      categoria: "Higiene e Beleza",
      preco: "R$ 19,69",
      img: "https://www.amigao.com/media/catalog/product/C/r/Creme_Pentear_Pantene_Hidro_Cauteriza_o_240m_2022_07_04_14_53_29..jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    }, {
      nome: "Bombom Nestlé 251g Especialidade",
      id: 21,
      desc: "A Caixa Nestlé® Especialidades junta os maiores sucessos da Nestlé em um lugar só. São variedades de chocolates em menores porções que enchem os olhos e agradam a todos os gostos. Encontre as delícias: Prestígio, Alpino, Suflair, Classic ao Leite, Galak, Lollo, Charge, Sensação, Chokito, Smash e Negresco",

      categoria: "Doces",
      preco: "R$ 10,98",
      img: "https://www.amigao.com/media/catalog/product/B/o/Bombom_Nestle_251g_Especialidade_7891000325131.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    },
    {
      nome: "Bala Dori Recheada Yogurte 100g",
      id: 22,
      desc: "Bala Dori Recheada Yogurte 100g está disponível para compra em incrementos de 1",

      categoria: "Doces",
      preco: "R$ 2,99",
      img: "https://www.amigao.com/media/catalog/product/B/a/Bala_Dori_Recheada_Yogurte_100g_7896058599640.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    },
    {
      nome: "Chocolate Lacta Intense 60% Cacau Original 85g",
      id: 23,
      desc: "Chocolate Lacta Intense 60% Cacau Original 85g está disponível para compra em incrementos de 1",

      categoria: "Doces",
      preco: "R$ 5,99",
      img: "https://www.amigao.com/media/catalog/product/C/h/Chocolate_Lacta_Intense_60_Cacau_Original_85g_7622210689573_1.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    },
    {
      nome: "Gelatina Apti 20g Vitaminada Amora 61194 Cd",
      id: 24,
      desc: "Gelatina Apti 20g Vitaminada Amora 61194 Cd está disponível para compra em incrementos de 1",

      categoria: "Doces",
      preco: "R$ 1,85",
      img: "https://www.amigao.com/media/catalog/product/G/e/Gelatina_Apti_20g_Vitaminada_Amora_61194_Cd_7896327516231.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    },
    {
      nome: "Limão Taiti Kg",
      id: 25,
      desc: "Limão Taiti Kg está disponível para compra em incrementos de 0.15",

      categoria: "HortiFruti",
      preco: "R$ 4,99",
      img: "https://www.amigao.com/media/catalog/product/L/i/Limao_Taiti_Kg_0000000028820.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=300&width=240&canvas=240:300",
    }, {
      nome: "Banana Nanica Kg",
      id: 26,
      desc: "Banana Nanica Kg está disponível para compra em incrementos de 0.15",

      categoria: "HortiFruti",
      preco: "R$ 4,99",
      img: "https://www.amigao.com/media/catalog/product/B/a/Banana_Nanica_Kg_0000000028158.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    }, {
      nome: "Ponkan Kg",
      id: 27,
      desc: "Ponkan Kg está disponível para compra em incrementos de 0.15",

      categoria: "HortiFruti",
      preco: "R$ 4,99",
      img: "https://www.amigao.com/media/catalog/product/P/o/Ponkan_Kg_0000000028325_15.png?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    }, {
      nome: "Tomate Saladete Kg",
      id: 28,
      desc: "Tomate Saladete Kg está disponível para compra em incrementos de 0.15",

      categoria: "HortiFruti",
      preco: "R$ 10,99",
      img: "https://www.amigao.com/media/catalog/product/T/o/Tomate_Saladete_Kg_0000000024259_28.png?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    }, {
      nome: "Cogumelo Shimeji Preto 200g",
      id: 29,
      desc: "Cogumelo Shimeji Preto 200g está disponível para compra em incrementos de 1",

      categoria: "HortiFruti",
      preco: "R$ 14,89",
      img: "https://www.amigao.com/media/catalog/product/C/o/Cogumelo_Shimeji_Preto_200g_7898962073001_44.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    }, {
      nome: "Pepino Caipira Kg",
      id: 30,
      desc: "Pepino Caipira Kg está disponível para compra em incrementos de 0.3",

      categoria: "HortiFruti",
      preco: "R$ 5,49",
      img: "https://www.amigao.com/media/catalog/product/P/e/Pepino_Caipira_Kg_0000000000871_89.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    }, {
      nome: "Chuchu Kg",
      id: 31,
      desc: "Chuchu Kg está disponível para compra em incrementos de 0.4",

      categoria: "HortiFruti",
      preco: "R$ 4,99",
      img: "https://www.amigao.com/media/catalog/product/C/h/Chuchu_Kg_0000000028462_67.png?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    }, {
      nome: "Abóbora Cabotiá Kg",
      id: 32,
      desc: "Abóbora Cabotiá Kg está disponível para compra em incrementos de 3",

      categoria: "HortiFruti",
      preco: "R$ 4,99",
      img: "https://www.amigao.com/media/catalog/product/A/b/Abobora_Cabotia_Kg_0000000028844.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    }, {
      nome: "Pitaya Kg",
      id: 33,
      desc: "Pitaya Kg está disponível para compra em incrementos de 0.3",

      categoria: "HortiFruti",
      preco: "R$ 18,79",
      img: "https://www.amigao.com/media/catalog/product/P/i/Pitaya_Kg_0000000052924.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=310&width=310&canvas=310:310",
    },
  ];

  return allItemsData;
};
