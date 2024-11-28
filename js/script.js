import { getData } from "./fetchData.js";
import { planets, displayData, changePage } from "./elements.js";

const applyInfo = async () => {
	const data = await getData();
	const info = await data;
	console.log(info.bodies);

	Object.entries(planets).forEach(([key, element]) => {
		if (element) {
			console.log(element);
			console.log(key);
			element.addEventListener("click", () => {
				const body = info.bodies.find((b) => b.name.toLowerCase() === key.toLowerCase());
				
				if (body) {
					console.log(body);
					console.log(`Clicked on: ${body.name}`);
					displayData.planetName.textContent = body.name;
					displayData.latin.textContent = body.latinName;
					displayData.infoText.textContent = body.desc;
					displayData.omkretsInfo.textContent = body.circumference + "KM";
					displayData.distansKm.textContent = body.distance + "KM";
					displayData.maxTemp.textContent = body.temp.day + "C";
					displayData.minTemp.textContent = body.temp.night + "C";
					// displayData.moon.textContent = body.moons;
					const maxMoonsToShow = 5;
					if (body.moons.length > 0) {
						const displayedMoons = body.moons.slice(0, maxMoonsToShow);
						displayData.moon.textContent =
							body.moons.length > maxMoonsToShow
								? `${displayedMoons.join(", ")}... (+${body.moons.length - maxMoonsToShow} more)`
								: displayedMoons.join(", ");
					} else {
						displayData.moon.textContent = "No moons";
					}
					changePage.planets.style.display = "none";
					changePage.info.style.display = "flex";
				}
			});
		}
	});
};

changePage.button.addEventListener("click", () => {
	changePage.planets.style.display = "flex";
	changePage.info.style.display = "none";
});

applyInfo();
