require('dotenv').config()

const request = require('request');

module.exports = {

  findBySearch: (req, res) => {
    let searchName = req.params.name;

    const options = {
      url: 'https://api.github.com/user/repos',
      headers: {
        'User-Agent': 'request',
        'Authorization': 'token ' + process.env.GITHUB_ACCESS_TOKEN
      }
    }

    request.get(options, (error, response, body) => {
      if(error) {
        res.status(500).json({
          message: error
        });
      } else {
        let repositories = JSON.parse(body);

        let filtered = repositories.reduce((acc, repository) => {
          if(repository.stargazers_count > 0) {
            acc.push(repository);
          }
          return acc;
        }, []);

        let searchByName = filtered.reduce((acc, repository) => {
          if(repository.name.indexOf(searchName)) {
            acc.push(repository);
          }
          return acc;
        }, []);

        res.status(200).json({
          data: searchByName
        });

        // res.send(JSON.parse(body));
        // res.status(200).json({
        //   message: 'success get all starred repository data',
        //   data: searchByName
        // });
      }
    });
  },

  findAll: (req, res) => {
    const options = {
      url: 'https://api.github.com/user/repos',
      headers: {
        'User-Agent': 'request',
        'Authorization': 'token ' + process.env.GITHUB_ACCESS_TOKEN
      }
    }

    request.get(options, (error, response, body) => {
      if(error) {
        res.status(500).json({
          message: error
        });
      } else {
        res.status(200).json({
          message: 'success get all repository data',
          data: JSON.parse(body)
        });
      }
    });
  },

  findByStarred: (req, res) => {
    const options = {
      url: 'https://api.github.com/user/repos',
      headers: {
        'User-Agent': 'request',
        'Authorization': 'token ' + process.env.GITHUB_ACCESS_TOKEN
      }
    }

    request.get(options, (error, response, body) => {
      if(error) {
        res.status(500).json({
          message: error
        });
      } else {
        let repositories = JSON.parse(body);

        let filtered = repositories.reduce((acc, repository) => {
          if(repository.stargazers_count > 0) {
            acc.push(repository);
          }
          return acc;
        }, []);

        // res.send(JSON.parse(body));
        res.status(200).json({
          message: 'success get all starred repository data',
          data: filtered
        });
      }
    });
  },

  findByUsername: (req, res) => {
    let username = req.params.username;

    const options = {
      url: `https://api.github.com/users/${username}/repos?type=all`,
      headers: {
        'User-Agent': 'request',
        'Authorization': 'token ' + process.env.GITHUB_ACCESS_TOKEN
      }
    }

    request.get(options, (error, response, body) => {
      if(error) {
        res.status(500).json({
          message: error
        });
      } else {

        // res.send(JSON.parse(body));
        res.status(200).json({
          message: 'success get repository filtered by username',
          data: JSON.parse(body)
        });
      }
    });
  },

  create: (req, res) => {
    const options = {
      url: 'https://api.github.com/user/repos',
      headers: {
        'User-Agent': 'request',
        'Authorization': 'token ' + process.env.GITHUB_ACCESS_TOKEN
      },
      body: JSON.stringify({
        name: req.body.name,
        description: req.body.description
      })
    }

    request.post(options, (error, response, body) => {
      if(error) {
        res.status(500).json({
          message: error
        });
      } else {
        res.status(201).json({
          message: 'success create new repository',
          data: JSON.parse(body)
        });
      }
    });
  },

  unstarRepo: (req, res) => {
    let owner = req.body.owner;
    let repo = req.body.repo;

    const options = {
      url: `https://api.github.com/user/starred/${owner}/${repo}`,
      headers: {
        'User-Agent': 'request',
        'Authorization': 'token ' + process.env.GITHUB_ACCESS_TOKEN
      }
    }

    request.delete(options, (error, response, body) => {
      if(error) {
        res.status(500).json({
          message: error
        });
      } else {

        // res.send(JSON.parse(body));
        res.status(200).json({
          message: 'success unstar repo'
        });
      }
    });
  }

}