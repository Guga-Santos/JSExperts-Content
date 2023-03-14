class Service {
  async makeRequest(url) {
    return (await fetch(url)).json();
  }

  async getPlanets(url) {

  }
}

module.exports = Service;