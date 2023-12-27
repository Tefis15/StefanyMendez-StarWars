import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import videoIntro from "../../video/star.mp4"
import PhrasesHome from "../component/phrasesHome";
import CarouselHome from "../component/carouselHome";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<video className="videoBgHome" src={videoIntro} autoPlay muted loop >
			</video>
			<h1 className="text-welcome text-white my-5" >May the force be with you</h1>
			<div className="container container-home my-5">
				<h1 className="title-home mb-3">
					Never forget...
				</h1>
				<div>
					<div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
						<div className="carousel-inner">
							<PhrasesHome active={"active"} author={"Yoda"}
								phrase={"Death is a natural part of life. Rejoice for those around you who transform into the Force. Mourn them do not. Miss them do not. Attachment leads to jealously. The shadow of greed, that is"}
								uid={20} />
							<PhrasesHome author={"Luke Skywalker"} phrase={"The Force is strong in my family, my father had it, I have it, my sister has it. You have that power too"}
								uid={1} />
							<PhrasesHome author={"Obi-One Kenobi"} phrase={"Your eyes can deceive you, do not trust them."} uid={10} />
						</div>
						<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
							<i class="fa-solid fa-angles-left fs-1 text-warning" aria-hidden="true"></i>
							<span className="visually-hidden">Previous</span>
						</button>
						<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
							<i class="fa-solid fa-angles-right fs-1 text-warning" aria-hidden="true"></i>
							<span className="visually-hidden">Next</span>
						</button>
					</div>

					<h1 className="title-home mb-3 mt-5">
					Movies`s Chronology
					</h1>
					<div id="carouselExampleDark" className="carousel slide mt-5 text-center" data-bs-ride="carousel">
						<div className="carousel-indicators">
							<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
							<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
							<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
							<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>
							<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="4" aria-label="Slide 5"></button>
							<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="5" aria-label="Slide 6"></button>
							<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="6" aria-label="Slide 7"></button>
							<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="7" aria-label="Slide 8"></button>
							<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="8" aria-label="Slide 9"></button>
							<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="9" aria-label="Slide 10"></button>
							<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="10" aria-label="Slide 11"></button>
						</div>
						<div className="carousel-inner ">
							<CarouselHome active={"active"} urlImg={"https://m.media-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg"} title={"The Phantom Menace"} year={"1999"} description={"The Galactic Republic is mired in chaos. The taxes of trade routes on the outer star systems are in dispute. Hoping to resolve the matter with a blockade of powerful warships, the greedy Trade Federation has stopped all shipments to Naboo's small planet."} />
							<CarouselHome urlImg={"https://m.media-amazon.com/images/M/MV5BMDAzM2M0Y2UtZjRmZi00MzVlLTg4MjEtOTE3NzU5ZDVlMTU5XkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_.jpg"} title={"Attack of the Clones"} year={"2002"} description={"In the Galactic Senate, restlessness reigns. Several thousand solar systems have declared their intention to leave the Republic. This separatist movement, led by the mysterious Count Dooku, has made it difficult for the limited number of Jedi knights to maintain peace and order in the galaxy. Senator Amidala, former Queen of Naboo, returns to the Galactic Senate to give her vote on the critical issue of creating an army of the Republic to help the overwhelmed Jedi."} />
							<CarouselHome urlImg={"https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_FMjpg_UX1000_.jpg"} title={"Revenge of the Sith"} year={"2005"} description={"War! The Republic crumbles under the attacks of the ruthless Lord Sith, Count Dooku. There are heroes on both sides, but evil is everywhere. In a forceful move, the diabolical droid leader, General Grievous, has broken into the capital of the Republic and kidnapped Chancellor Palpatine, leader of the Galactic Senate. While the separatist droid army tries to flee with its valuable hostage, two Jedi knights begin a desperate mission to free the captive Chancellor."} />
							<CarouselHome urlImg={"https://m.media-amazon.com/images/M/MV5BOTM2NTI3NTc3Nl5BMl5BanBnXkFtZTgwNzM1OTQyNTM@._V1_.jpg"} title={"Han Solo: A Star Wars Story"} year={"2018"} description={"The young Han Solo flees from the planet Corellia years before meeting Luke Skywalker and Princess Leia, but he has to leave his beloved Qi'ra behind. After signing up for the Imperial Academy to be a pilot, Han meets a wookie named Chewbacca and later the famous player Lando Calrissian, owner of the Millennial Falcon. On a desperate mission, Han will join Tobias Beckett to obtain a valuable shipment of coaxium."} />
							<CarouselHome urlImg={"https://m.media-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_.jpg"} title={"Rogue One: A Star Wars Story"} year={"2016"} description={"In a time of conflict, a group of atypical heroes join in a suicide mission to steal the plans of The Death Star, the ultimate weapon of destruction of the Empire. This key fact in the chronology of Star Wars brings together ordinary people who decide to do extraordinary things and thus become part of something much more important than themselves."} />
							<CarouselHome urlImg={"https://static.posters.cz/image/750/posters/star-wars-a-new-hope-one-sheet-i28733.jpg"} title={"StarWars A New Hope"} year={"1977"} description={"The ship in which Princess Leia travels is captured by the imperial troops under the command of the fearsome Darth Vader. Before being caught, Leia manages to introduce a message in her R2-D2 robot, who, accompanied by her inseparable C-3PO, manage to escape. After landing on the planet Tattooine, they are captured and sold to the young Luke Skywalker, who will discover the hidden message that is destined for Obi Wan Kenobi, Jedi master whom Luke must find to save the princess."} />
							<CarouselHome urlImg={"https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg"} title={"The Empire Strikes Back"} year={"1980"} description={"These are adverse times for rebellion. Although the Death Star has been destroyed, the imperial troops have brought the rebel forces out of their hidden bases and chase them across the galaxy. After escaping from the terrible Imperial Fleet, a group of freedom warriors, led by Luke Skywalker, has established a new secret base in the frozen world of Hoth."} />
							<CarouselHome urlImg={"https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg"} title={"Return of the Jedi"} year={"1983"} description={"Six months after Han Solo was captured and frozen in carbonite in the City of Clouds, the Galactic Empire is building a new Death Star. Meanwhile, the young Luke struggles to achieve Jedi mastery."} />
							<CarouselHome urlImg={"https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_.jpg"} title={"The Force Awakens"} year={"2015"} description={"Thirty years after the Rebel Alliance's victory over the second Death Star, the galaxy has to face a new threat: the evil Kylo Ren and the First Order. When the deserter Finn arrives on a deserted planet, he meets Rey, whose android contains a secret map. Together, the young couple will join forces with Han Solo to make sure that the resistance finds Luke Skywalker, the last of the Jedi knights."} />
							<CarouselHome urlImg={"https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_.jpg"} title={"The Last Jedi"} year={"2017"} description={"The First Order, under the command of supreme leader Snoke, is about to take military control of the galaxy. Only General Leia Organa and her Resistance fighters face the growing tyranny, convinced that Jedi master Luke Skywalker will return and return a spark of hope to the fight."} />
							<CarouselHome urlImg={"https://m.media-amazon.com/images/M/MV5BMDljNTQ5ODItZmQwMy00M2ExLTljOTQtZTVjNGE2NTg0NGIxXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_.jpg"} title={"The Rise of Skywalker"} year={"2019"} description={"The surviving Resistance faces the First Order, and King, Finn, Poe and the rest of the heroes will face new challenges and a final battle with the wisdom of previous generations."} />
							
						</div>
						<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
							<i class="fa-solid fa-angles-left fs-1 text-warning" aria-hidden="true"></i>
							<span className="visually-hidden">Previous</span>
						</button>
						<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
							<i class="fa-solid fa-angles-right fs-1 text-warning" aria-hidden="true"></i>
							<span className="visually-hidden">Next</span>
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
