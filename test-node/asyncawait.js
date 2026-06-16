async function getTeams(){
    return "Copa Verde vs Spain"
}

async function getStadium(teams){
    return teams + " Dallas Stadium"
}

async function getMatchDetails(){
    const teams = await getTeams();
    const matchInfo = await getStadium(teams)
    console.log(matchInfo)
}

module.exports = {
    getMatchDetails
}