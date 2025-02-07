import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

const MainView = () => {

  //State: list of MovieCards
  const [movies, setMovies] = useState([
    {
      "Genre": {
        "Name": "Drama",
        "Description": "The drama genre is a broad category that features stories portraying human experiences, emotions, conflicts, and relationships in a realistic and emotionally impactful way. Dramas delve into the complexities of human life, often exploring themes of love, loss, morality, societal issues, personal growth, with the aim to evoke an emotional response from the audience by presenting relatable and thought-provoking stories."
      },
      "Director": {
        "Name": "Frank Darabont",
        "Bio": "This is the biography of Frank Darabont.",
        "BirthYear": "1959",
        "DeathYear": null,
        "Movies": [
          "The Shawshank Redemption",
          "The Green Mile",
          "The Majestic"
        ]
      },
      "_id": "671ea93b577ed8cab386b01e",
      "Title": "The Shawshank Redemption",
      "ReleaseYear": "1994",
      "Rating": "9.3",
      "Description": "A banker convicted of uxoricide forms a friendship over a quarter century with a hardened convict, while maintaining his innocence and trying to remain hopeful through simple compassion.",
      "Actors": [
        "Tim Robbins",
        "Morgan Freeman",
        "Bob Gunton"
      ],
      "ImageURL": "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_SX300.jpg",
      "Featured": true
    },
    {
      "Genre": {
        "Name": "Horror",
        "Description": "The horror genre features stories that aim to elicit fear, suspense, and a sense of dread in its audience. Horror stories often explore themes related to the unknown, the supernatural, and the macabre, and they frequently evoke strong emotional reactions such as anxiety, terror, and unease."
      },
      "Director": {
        "Name": "John Carpenter",
        "Bio": "This is the biography of John Carpenter.",
        "BirthYear": "1984",
        "DeathYear": null,
        "Movies": [
          "Halloween",
          "The Fog",
          "The Thing",
          "Escape from New York"
        ]
      },
      "_id": "671eb218577ed8cab386b01f",
      "Title": "Halloween",
      "ReleaseYear": "1978",
      "Rating": "7.7",
      "Description": "Fifteen years after murdering his sister on Halloween night 1963, Michael Myers escapes from a mental hospital and returns to the small town of Haddonfield, Illinois, to kill again.",
      "Actors": [
        "Donald Pleasence",
        "Jamie Lee Curtis",
        "Tony Moran"
      ],
      "ImageURL": "https://m.media-amazon.com/images/M/MV5BMzZiNTdiYTgtYjNkMS00MmJmLWEwZGQtNmY0NGJkMGE0YmYzXkEyXkFqcGc@._V1_SX300.jpg",
      "Featured": true
    },
    {
      "Genre": {
        "Name": "Drama",
        "Description": "The drama genre is a broad category that features stories portraying human experiences, emotions, conflicts, and relationships in a realistic and emotionally impactful way. Dramas delve into the complexities of human life, often exploring themes of love, loss, morality, societal issues, personal growth, with the aim to evoke an emotional response from the audience by presenting relatable and thought-provoking stories."
      },
      "Director": {
        "Name": "Rob Reiner",
        "Bio": "This is the biography of Rob Reiner.",
        "BirthYear": "1947",
        "DeathYear": null,
        "Movies": [
          "This Is Spinal Tap",
          "Stand by Me",
          "The Princess Bride",
          "When Harry Met Sally",
          "Misery",
          "A Few Good Men"
        ]
      },
      "_id": "671ea574577ed8cab386b01d",
      "Title": "Stand by Me",
      "ReleaseYear": "1986",
      "Rating": "8.1",
      "Description": "A writer recounts a childhood journey with his friends to find the body of a missing boy.",
      "Actors": [
        "Wil Wheaton",
        "River Phoenix",
        "Corey Feldman"
      ],
      "ImageURL": "https://m.media-amazon.com/images/M/MV5BNGJkNTUwM2MtZWE2MS00YjNkLWE3MjktNWQwZDQxMDIyZWVmXkEyXkFqcGc@._V1_SX300.jpg",
      "Featured": true
    },
    {
      "Genre": {
        "Name": "Adventure",
        "Description": "The adventure genre features exciting journeys, quests, or expeditions undertaken by characters who often face challenges, obstacles, and risks in pursuit of a goal. Adventures can take place in a wide range of settings, from exotic and fantastical locations to historical or even everyday environments."
      },
      "Director": {
        "Name": "Steven Spielberg",
        "Bio": "This is the very, very lengthy biography of Steven Spielberg.",
        "BirthYear": "1946",
        "DeathYear": null,
        "Movies": [
          "Jaws",
          "E.T. the Extra-Terrestrial",
          "Raiders of the Lost Ark",
          "Indiana Jones and the Temple of Doom",
          "Indiana Jones and the Last Crusade",
          "Who Framed Roger Rabbit",
          "Close Encounters of the Third Kind",
          "Schindler's List",
          "Poltergeist",
          "Jurassic Park"
        ]
      },
      "_id": "671eb5b8577ed8cab386b020",
      "Title": "Raiders of the Lost Ark",
      "ReleaseYear": "1981",
      "Rating": "8.4",
      "Description": "In 1936, archaeologists and adventurers of the U.S. government hired Indiana Jones to find the Ark of the Covenant before the Nazis could obtain its extraordinary powers.",
      "Actors": [
        "Harrison Ford",
        "Karen Allen",
        "Paul Freeman"
      ],
      "ImageURL": "https://m.media-amazon.com/images/M/MV5BOGNhMjg2ZjgtYzk4Ni00MTViLTg1MmUtYzM2MDZiYjZlMmU3XkEyXkFqcGc@._V1_SX300.jpg",
      "Featured": true
    },
    {
      "Genre": {
        "Name": "Comedy",
        "Description": "The comedy genre refers to a category of entertainment that aims to amuse and entertain audiences by using humor, wit, and comedic situations. Comedies are created with the primary intention of eliciting laughter and providing lighthearted enjoyment. They encompass a wide range of styles, tones, and themes, appealing to various tastes and audiences."
      },
      "Director": {
        "Name": "Ivan Reitman",
        "Bio": "This is the biography of Ivan Reitman.",
        "BirthYear": "1946",
        "DeathYear": "2022",
        "Movies": [
          "National Lampoon's Animal House",
          "Ghostbusters",
          "Meatballs",
          "Stripes",
          "Junior",
          "Private Parts",
          "Twins"
        ]
      },
      "_id": "671eb9b9577ed8cab386b021",
      "Title": "Ghostbusters",
      "ReleaseYear": "1984",
      "Rating": "7.8",
      "Description": "Three parapsychologists forced out of their university funding set up shop as a unique ghost removal service in New York City, attracting frightened yet skeptical customers.",
      "Actors": [
        "Bill Murray",
        "Dan Aykroyd",
        "Sigourney Weaver",
        "Harold Ramis",
        "Rick Moranis"
      ],
      "ImageURL": "https://m.media-amazon.com/images/M/MV5BMGI0Yjg2ODAtNDYzNi00Njc2LTlkMmMtMmRmYWI5MDE4ZGRkXkEyXkFqcGc@._V1_SX300.jpg",
      "Featured": false
    },
    {
      "Genre": {
        "Name": "Sci-Fi",
        "Description": "The sci-fi genre, short for science fiction, features imaginative and futuristic concepts that are often rooted in scientific principles, technology, and possibilities. These stories delve into \"what if\" questions and can serve as a platform to address contemporary social, political, and ethical issues by projecting them onto future or alternate settings."
      },
      "Director": {
        "Name": "Richard Kelly",
        "Bio": "This is the biography of Richard Kelly.",
        "BirthYear": "1975",
        "DeathYear": null,
        "Movies": [
          "Donnie Darko"
        ]
      },
      "_id": "671ec257577ed8cab386b023",
      "Title": "Donnie Darko",
      "ReleaseYear": "2001",
      "Rating": "8.0",
      "Description": "After narrowly escaping a bizarre accident, a troubled teenager is plagued by visions of a man in a large rabbit suit who manipulates him to commit a series of crimes.",
      "Actors": [
        "Jake Gyllenhaal",
        "Jena Malone",
        "Mary McDonnell",
        "Drew Barrymore",
        "Patrick Swayze"
      ],
      "ImageURL": "https://m.media-amazon.com/images/M/MV5BMWE3NTYzZmEtM2U5MS00MDZhLTk2ZTQtZTgzNjg0ZGQ5ZjM0XkEyXkFqcGc@._V1_SX300.jpg",
      "Featured": true
    },
    {
      "Genre": {
        "Name": "Drama",
        "Description": "The drama genre is a broad category that features stories portraying human experiences, emotions, conflicts, and relationships in a realistic and emotionally impactful way. Dramas delve into the complexities of human life, often exploring themes of love, loss, morality, societal issues, personal growth, with the aim to evoke an emotional response from the audience by presenting relatable and thought-provoking stories."
      },
      "Director": {
        "Name": "David Fincher",
        "Bio": "David Fincher was born in 1962 in Denver, Colorado, and was raised in Marin County, California. When he was 18 years old he went to work for John Korty at Korty Films in Mill Valley. He subsequently worked at ILM (Industrial Light and Magic) from 1981-1983. Fincher left ILM to direct TV commercials and music videos after signing with N. Lee Lacy in Hollywood. He went on to found Propaganda in 1987 with fellow directors Dominic Sena, Greg Gold and Nigel Dick. Fincher has directed TV commercials for clients that include Nike, Coca-Cola, Budweiser, Heineken, Pepsi, Levi's, Converse, AT&T and Chanel. He has directed music videos for Madonna, Sting, The Rolling Stones, Michael Jackson, Aerosmith, George Michael, Iggy Pop, The Wallflowers, Billy Idol, Steve Winwood, The Motels and, most recently, A Perfect Circle. As a film director, he has achieved huge success with Se7en (1995), Fight Club (1999) and, Panic Room (2002).",
        "BirthYear": "1962",
        "DeathYear": null,
        "Movies": [
          "Se7en",
          "Fight Club",
          "Panic Room"
        ]
      },
      "_id": "671ebe39577ed8cab386b022",
      "Title": "Fight Club",
      "ReleaseYear": "1999",
      "Rating": "8.8",
      "Description": "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
      "Actors": [
        "Brad Pitt",
        "Edward Norton",
        "Helena Bonham Carter",
        "Meat Loaf"
      ],
      "ImageURL": "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_SX300.jpg",
      "Featured": true
    },
    {
      "Genre": {
        "Name": "Adventure",
        "Description": "The adventure genre features exciting journeys, quests, or expeditions undertaken by characters who often face challenges, obstacles, and risks in pursuit of a goal. Adventures can take place in a wide range of settings, from exotic and fantastical locations to historical or even everyday environments."
      },
      "Director": {
        "Name": "Denis Villeneuve",
        "Bio": "This is the biography of Denis Villeneueve.",
        "BirthYear": "1967",
        "DeathYear": null,
        "Movies": [
          "Arrival",
          "Prisoners",
          "Enemy",
          "Dune: Part One",
          "Dune: Part Two"
        ]
      },
      "_id": "671ec45f577ed8cab386b024",
      "Title": "Dune: Part One",
      "ReleaseYear": "2021",
      "Rating": "8.0",
      "Description": "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
      "Actors": [
        "Timothée Chalamet",
        "Rebecca Ferguson",
        "Zendaya"
      ],
      "ImageURL": "https://m.media-amazon.com/images/M/MV5BNWIyNmU5MGYtZDZmNi00ZjAwLWJlYjgtZTc0ZGIxMDE4ZGYwXkEyXkFqcGc@._V1_SX300.jpg",
      "Featured": true
    },
    {
      "Genre": {
        "Name": "Adventure",
        "Description": "The adventure genre features exciting journeys, quests, or expeditions undertaken by characters who often face challenges, obstacles, and risks in pursuit of a goal. Adventures can take place in a wide range of settings, from exotic and fantastical locations to historical or even everyday environments."
      },
      "Director": {
        "Name": "Denis Villeneuve",
        "Bio": "This is the biography of Denis Villeneueve.",
        "BirthYear": "1967",
        "DeathYear": null,
        "Movies": [
          "Arrival",
          "Prisoners",
          "Enemy",
          "Dune: Part One",
          "Dune: Part Two"
        ]
      },
      "_id": "671ec4d7577ed8cab386b025",
      "Title": "Dune: Part Two",
      "ReleaseYear": "2024",
      "Rating": "8.5",
      "Description": "Duke Paul Atreides joins the Fremen and begins a spiritual and martial journey to become Muad'dib, while trying to prevent the horrible but inevitable future he's witnessed: a Holy War in his name, spreading throughout the known universe.",
      "Actors": [
        "Timothée Chalamet",
        "Rebecca Ferguson",
        "Zendaya"
      ],
      "ImageURL": "https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_SX300.jpg",
      "Featured": true
    },
    {
      "Genre": {
        "Name": "Crime",
        "Description": "The crime genre features criminal activities, investigations, law enforcement, crimes, and the pursuit of justice. Crime stories often revolve around the planning, execution, and consequences of criminal acts, as well as the efforts to solve and prevent such acts. They explore various aspects of criminal behavior, motives, and the moral dilemmas faced by both perpetrators and those seeking to uphold the law."
      },
      "Director": {
        "Name": "David Fincher",
        "Bio": "David Fincher was born in 1962 in Denver, Colorado, and was raised in Marin County, California. When he was 18 years old he went to work for John Korty at Korty Films in Mill Valley. He subsequently worked at ILM (Industrial Light and Magic) from 1981-1983. Fincher left ILM to direct TV commercials and music videos after signing with N. Lee Lacy in Hollywood. He went on to found Propaganda in 1987 with fellow directors Dominic Sena, Greg Gold and Nigel Dick. Fincher has directed TV commercials for clients that include Nike, Coca-Cola, Budweiser, Heineken, Pepsi, Levi's, Converse, AT&T and Chanel. He has directed music videos for Madonna, Sting, The Rolling Stones, Michael Jackson, Aerosmith, George Michael, Iggy Pop, The Wallflowers, Billy Idol, Steve Winwood, The Motels and, most recently, A Perfect Circle. As a film director, he has achieved huge success with Se7en (1995), Fight Club (1999) and, Panic Room (2002).",
        "BirthYear": "1962",
        "DeathYear": null,
        "Movies": [
          "Se7en",
          "Fight Club",
          "Panic Room"
        ]
      },
      "_id": "671ec588577ed8cab386b026",
      "Title": "Se7en",
      "ReleaseYear": "1995",
      "Rating": "8.6",
      "Description": "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
      "Actors": [
        "Morgan Freeman",
        "Brad Pitt",
        "Kevin Spacey"
      ],
      "ImageURL": "https://m.media-amazon.com/images/M/MV5BY2IzNzMxZjctZjUxZi00YzAxLTk3ZjMtODFjODdhMDU5NDM1XkEyXkFqcGc@._V1_SX300.jpg",
      "Featured": false
    }
  ]);

  //State : selecting a movie by clicking on a MovieCard
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (movies.length === 0) {
    return <div>There are no movies in the list!</div>;
  }

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => { setSelectedMovie(null) }} />
    );
  }

  return (
    <div>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }} />
        );
      })}
    </div>
  );
};

export default MainView;