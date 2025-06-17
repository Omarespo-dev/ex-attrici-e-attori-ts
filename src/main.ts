// 📌 Milestone 1
// Crea un type alias Person per rappresentare una persona generica.
type Person = {
  readonly id: number,
  readonly name: string,
  birth_year: number,
  death_year?: number,
  biography: string,
  image: string
}

// 📌 Milestone 2
//     nationality: una stringa tra un insieme definito di valori.
//     Le nazionalità accettate sono: American, British, Australian, Israeli-American, South African, French, Indian, Israeli, Spanish, South Korean, Chinese.
type ActressNationality = "American" | "British" | "Australian" | "Israeli-American" | "South" | "African" | "French" | "Indian" | "Israeli" | "Spanish" | "South Korean" | "Chinese"


// Crea un type alias Actress che oltre a tutte le proprietà di Person, aggiunge le seguenti proprietà:

type Actress = Person & {
  most_famous_movies: [string, string, string],
  award: string,
  nationality: ActressNationality
}




