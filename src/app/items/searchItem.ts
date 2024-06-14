import { allItems } from "./allItems"

export const searchItem = (search: string) => {
    const allItems = JSON.parse(localStorage.getItem("stockItems") as string)
    if (allItems) {
        const searchresult = allItems.map((item: any) => {
            if (item.nome.toLowerCase().includes(search.toLowerCase())) {
                return item
            }
        }).filter((item: any) => item !== undefined).sort(function (a: any, b: any) {
            return search < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
        });

        return searchresult
    }


}