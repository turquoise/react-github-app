import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';

const RepoGrid = (props) => {
  return (
    <ul className='popular-list'>
    {
      props.repos.map( (repo, i) => {
        return (
          <li key={i} className="popular-item">
            <div className="popular-rank">#{i + 1}</div>
            <ul className="space-list-items">
              <li>
                <img className="avatar" src={repo.owner.avatar_url} alt={'Avatar for ' + repo.owner.login}/>
              </li>
              <li>
                <a href={repo.html_url} >
                  {repo.name}
                </a>
              </li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })
    }
    </ul>
  );
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

const SelectLanguage = (props) =>  {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className="languages">
      {
        languages.map( (lang, i) => {
          return (
            <li key={i}
                style={lang === props.selectedLanguage ? {color: '#d0021b'} : null}
                onClick={ () => props.onSelect(lang)}>
              {lang}
            </li>
          )
        })
      }
    </ul>
  )
}

// class SelectLanguage extends Component {
//   render() {
//     const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
//     return (
//       <ul className="languages">
//         {
//           languages.map( (lang, i) => {
//             return (
//               <li key={i}
//                   style={lang === this.props.selectedLanguage ? {color: '#d0021b'} : null}
//                   //onClick={this.updateLanguage.bind(null, lang)}
//                   onClick={ () => this.props.onSelect(lang)}>
//                 {lang}
//               </li>
//             )
//           })
//         }
//       </ul>
//     );
//   }
// }

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}


class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };
    //this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage = (lang) => {
    this.setState({
      selectedLanguage: lang,
      repos: null
    });

    api.fetchPopularRepos(lang)
      .then( (repos) => {
        //console.log('repos ', repos);
        this.setState( () => {
          return {
            repos: repos
          }
        })
      });
  }

  render() {
    return (
      <div className="container">
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage} />
          {/*JSON.stringify(this.state.repos, null, 2)*/}
          { !this.state.repos ? <p>Loading...</p> : <RepoGrid repos={this.state.repos} /> }

      </div>
    );
  }
}

export default Popular;
