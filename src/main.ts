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




// 📌 Milestone 3

// GET /actresses/:id
// http://localhost:3333/actresses${id}

// La funzione deve restituire l’oggetto Actress, se esiste, oppure null se non trovato.

// Utilizza un type guard chiamato isActress per assicurarti che la struttura del dato ricevuto sia corretta.


//definisco type guard per obj
function isActress(object: unknown): object is Actress {
  if (
    typeof object === 'object' &&
    object !== null &&
    'id' in object &&
    typeof object.id === 'number' &&
    'name' in object &&
    typeof object.name === 'string' &&
    'birth_year' in object &&
    typeof object.birth_year === 'number' &&
    'biography' in object &&
    typeof object.biography === 'string' &&
    'image' in object &&
    typeof object.image === 'string' &&
    (!('death_year' in object) || typeof object.death_year === 'number')
  ) {
    return true
  } else {
    return false
  }
}


// Crea una funzione getActress che, dato un id, effettua una chiamata a:
async function getActress(id: number): Promise<Actress | null> {

  try {

    const response = await fetch(`http://localhost:3333/actresses/${id}`)
    //gestione errore response
    if (!response.ok) {
      throw new Error("Errore HTTP" + response.status);
    }

    const obj: unknown = await response.json()

    if (!isActress(obj)) {
      throw new Error("Formato dei dati non valito");
    }

    return obj
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Errore del serve ${err.message}`)
    }

    return null
  }
}


/////////////////////////
// async function risolviPromise() {
//   const risultato = await getActress(1);
//   console.log(risultato);
// }

// risolviPromise()



// 📌 Milestone 4
// Crea una funzione getAllActresses che chiama:
async function getAllActresses(): Promise<Actress[]> {
  // GET /actresses

  // La funzione deve restituire un array di oggetti Actress.

  // Può essere anche un array vuoto.

  try {
    const response = await fetch(`http://localhost:3333/actresses`)
    const obj: unknown = await response.json()

    //Se object non e un arr
    if (!(obj instanceof Array)) {
      throw new Error("Formato non valido ");
    }

    // Controlla che tutti gli elementi siano attrici valide
    const allValid = obj.every(item => isActress(item))

    //Se allValid non e valido 
    if (!allValid) {
      throw new Error("Uno o più elementi non sono validi");
    }

    //Questo array è sicuro, trattalo come Actress[]
    return obj as Actress[];

  } catch (err) {
    //se err e effettivamente un errore allora dammello altrimenti ritoranmi []
    if (err instanceof Error) {
      console.error(`Errore del server impossibile recuperare gli attori ${err}`)
    }
    return []
  }

}

