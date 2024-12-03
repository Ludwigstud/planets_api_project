
//Function to fetch data for auth-key and then use it to fetch data for planets

export const getData = async () => {
	try {
		const keyResponse = await fetch(
			"https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys",
			{
				method: "POST",
			}
		);
		const keyData = await keyResponse.json();

		const dataResponse = await fetch(
			"https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies",
			{
				method: "GET",
				headers: { "x-zocom": keyData.key },
			}
		);
		const finalData = await dataResponse.json();

		return finalData;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};
