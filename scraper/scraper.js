// scrap data from https://www.fifaindex.com/players/
// and save it to a json file
import client from "../dbConnection/dbConnection.js";

import * as cheerio from "cheerio";

const url = "https://www.fifaindex.com/players/";

const scrape = async () => {
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);

  const players = [];
  $(".table.table-striped.table-players > tbody > tr").each((i, element) => {
    const $element = $(element);
    const $name = $element.find(".link-player");
    const $position = $element.find(".badge.position");
    const $age = $element.find("td[data-title='Age']");
    const $nationality = $element.find(".link-nation").attr("title");
    const $club = $element.find('a[title$="FIFA 23"]').attr("title");
    const $rating = $element.find(".rating.r1");
    const $playerImg = $element.find("td img").attr("src");
    const $clubImg = $element.find('td[data-title="Team"] img').attr("src");
    const nationalityFlag = $element
      .find('td[data-title="Nationality"] img')
      .attr("src");

    const player = {
      name: $name.text(),
      age: $age.text(),
      position: $position.text(),
      nationality: $nationality,
      club: $club,
      rating: $rating.text(),
      playerImg: $playerImg,
      clubImg: $clubImg,
      nationalityFlag: nationalityFlag,
    };
    players.push(player);
  });
  return players;
};

// send data to database mongodb
const save = async () => {
  client.connect();
  const players = await scrape();

  const filteredPlayers = players.filter((player) => {
    return (
      player.name !== "" &&
      player.age !== "" &&
      player.position !== "" &&
      player.nationality !== undefined &&
      player.club !== undefined
    );
  });

  const result = await client
    .db("fifa")
    .collection("players")
    .insertMany(filteredPlayers);
  console.log(`${result.insertedCount} players were inserted`);

  client.close();
};

export default scrape;
