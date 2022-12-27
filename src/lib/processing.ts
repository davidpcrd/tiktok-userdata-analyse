import type { CardInfo, LoginInfo, ProfileData } from "./typing";

export function groupByDay(json: LoginInfo[]): { [key: string]: number } {
	let end: { [key: string]: number } = {};
	for (const el of json) {
		let date: string = el.Date.split(" ")[0];
		if (end[date] == undefined) {
			end[date] = 0;
		}
		end[date] += 1;
	}
	return end;
}

export function groupByDay2Array(json: LoginInfo[]): {dates: Date[], values: number[]}{
	let lastDate:string = json[0].Date.split(" ")[0];
	let days: Date[] = [new Date(lastDate)];
	let count: number[] = [0];
	for (const el of json) {
		let date: string = el.Date.split(" ")[0];
		if(date === lastDate){
			count[count.length-1]+=1;
		}else{
			count.push(1);
			days.push(new Date(date));
			lastDate = date;
		}
	}
	return {
		dates: days,
		values: count
	};
}

export function fillDaysBetween(data: { [key: string]: number }, allDate: Date[]): {dates: string[], values: number[]}{
	let resultDates: string[] = [];
	let resultValues: number[] = [];

	
	for (let index = 0; index < allDate.length; index++) {
		let dateString:string = allDate[index].toISOString().split("T")[0];
		resultDates.push(dateString);
		if(data[dateString]){
			resultValues.push(data[dateString]);
		}else{
			resultValues.push(0);
		}
	}	
	
	return{
		dates: resultDates,
		values : resultValues
	}
}

export const getDatesBetween = (
	startDate: Date,
	endDate: Date,
	includeEndDate?: boolean
) => {	
	const dates = [];
	const currentDate = startDate;
	while (currentDate < endDate) {
		dates.push(new Date(currentDate));
		currentDate.setDate(currentDate.getDate() + 1);
	}
	if (includeEndDate) dates.push(endDate);
	
	return dates;
};

export function generateArrayByList(json: LoginInfo[]) : {dates: string[], values: number[]}{
	let result = groupByDay(json);
	let sortedDates = Object.keys(result).sort((a: string, b: string) => {
		if (new Date(a) < new Date(b)) return -1
		if (new Date(a) >= new Date(b)) return 1
		return 1
	});

	let startDate: Date = new Date(sortedDates[0]);
	let endDate: Date = new Date(sortedDates[sortedDates.length-1]);
	let filledDateBetween: Date[] = getDatesBetween(startDate, endDate, true);

	return fillDaysBetween(result, filledDateBetween);
}

export function analyseJSON(json:{[key:string] : any}): {
	profileData: ProfileData,
	graph: object,
	loginGraph: object,
	cards: CardInfo[]
} {
	let intermediary: {[key:string] : any} = json["Profile"]["Profile Information"]["ProfileMap"]

	intermediary["likesReceived"] = json["Profile"]["Profile Information"]["ProfileMap"]["likesReceived"] === "None" ?  0 : parseInt(json["Profile"]["Profile Information"]["ProfileMap"]["likesReceived"])
	intermediary["interests"] = json["App Settings"]["Settings"]["SettingsMap"]["Interests"].split("|")
	
	let videoHist = json["Activity"]["Video Browsing History"]["VideoList"];
	console.log(videoHist[0]);
	
	let grouped = groupByDay(videoHist);
	let sommeTiktok:number = 0;
	let maxTiktokInOneDay:number = 0;
	for (const val of Object.values(grouped) as number[]) {
		sommeTiktok+=val;
		if(val > maxTiktokInOneDay){
			maxTiktokInOneDay = val;
		}
	}
	let avgTiktokPerDay = sommeTiktok / Object.values(grouped).length;

	let cards: CardInfo[] = []	
	cards.push({
		text: "followers",
		value: json["Activity"]["Follower List"]["FansList"].length
	})
	cards.push({
		text: "follows",
		value: json["Activity"]["Following List"]["Following"].length
	})
	cards.push({
		text: "likes received",
		value: json["Profile"]["Profile Information"]["ProfileMap"]["likesReceived"] === "None" ? "0" : json["Profile"]["Profile Information"]["ProfileMap"]["likesReceived"]
	})
	cards.push({
		text: "favorites videos",
		value: json["Activity"]["Like List"]["ItemFavoriteList"].length
	})

	cards.push({
		text: "videos shared",
		value: json["Activity"]["Share History"]["ShareHistoryList"].length
	})
	cards.push({
		text: "likes given",
		value: json["Activity"]["Like List"]["ItemFavoriteList"].length
	})
	cards.push({
		text: "tiktoks seen per days",
		value: Math.round(avgTiktokPerDay+1)
	})
	cards.push({
		text: "tiktok in one day (max)",
		value: maxTiktokInOneDay
	})
	cards.push({
		text: "hours per day on tiktok",
		value: (Math.round(avgTiktokPerDay*(5/3600)+1)).toString() + " - "+ (Math.round(avgTiktokPerDay*(34/3600)+1)).toString()
	})



	let data = generateArrayByList(json["Activity"]["Login History"]["LoginHistoryList"]);

	let processed = generateArrayByList(json["Activity"]["Video Browsing History"]["VideoList"])
	let videoDates = processed.dates;
	let videoHistValues = processed.values;
	
	return {
		profileData: intermediary as ProfileData,
		cards: cards,
		graph: {
			labels: videoDates,
			datasets: [
				{
					label: "Video per day",
					fill: true,
					data: videoHistValues
				}
			]
		},
		loginGraph: {
			labels: data.dates,
			datasets: [
				{
					label: "Connexion per days",
					fill: true,
					data: data.values
				}
			]
		}
	}
	
}
