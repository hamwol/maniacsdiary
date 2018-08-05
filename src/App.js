import React, { Component } from 'react';
import Node from './components/node';
class App extends Component {  

  constructor(props){
    super(props)

    this.state = {
      list: [],
      updateKey: 0,
      idxlist: '미드',
      subject: '',
      season: '',
      episode: '',
      star: '',
      content: '',
      search: '',
    }  

  
  }

  componentDidMount(){
    this.getList();
  }

  searchBtn = () => {
    fetch('http://localhost:3001/list?search='+this.state.search, {
      method: 'GET',
    }).then(res => res.json()).then(res => {this.setState({
      list: res
    })}).catch(e => {})
  }

  getList = () => {
    fetch('http://localhost:3001/list', {
      method: 'GET'
    }).then(res => res.json()).then(res => {this.setState({
      list: res
    })}).catch(e => {})
  }

  addList = (e) => {
    e.preventDefault();

    let body = {};
    body.index = this.state.idxlist
    body.subject = this.state.subject
    body.season = this.state.season
    body.episode = this.state.episode
    body.star = this.state.star
    body.content = this.state.content

    if(this.state.updateKey === 0) {
      fetch('http://localhost:3001/insert', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(body)
      }).then(res => res.json()).then(res => {
        this.getList();
      }).catch(e => {})
    } else {
      fetch('http://localhost:3001/update/' + this.state.updateKey, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(body)        
      }).then(res => res.json()).then(res => {
        this.getList();
      }).catch(e => {})
    }
    this.setState({
      updateKey: 0
    })
  }

  delList = (key) => {
    fetch('http://localhost:3001/delete/' + key,{
      method: 'DELETE'
    }).then(res => res.json()).then(res => {
      this.getList();
    }).catch(e => {})

    this.setState({
      updateKey: 0
    })
  }

  updateList = (key) => {
    this.setState({
      idxlist: key[0],
      subject: key[1],
      season: key[2],
      episode: key[3],
      star: key[4],
      content: key[5],
      updateKey: key[6]
    })
  }

  reset = () =>{
    this.setState({
      idxlist: '미드',
      subject: '',
      season: '',
      episode: '',
      star: '',
      content: '',
      updateKey: 0
    })
  }

  changeIdxlist = e => {
    this.setState({
      idxlist: e.target.value
    })
  }
  changeSubject = e => {
    this.setState({
      subject: e.target.value
    })
  }
  changeSeason = e => {
    this.setState({
      season: e.target.value
    })
  }
  changeEpisode = e => {
    this.setState({
      episode: e.target.value
    })
  }
  changeStar = e => {
    this.setState({
      star: e.target.value
    })
  }
  changeContent = e => {
    this.setState({
      content: e.target.value
    })
  }
  changeSearch = e => {
    this.setState({
      search: e.target.value
    })
  }

  render() {
    const lists = this.state.list.map((e, key) =>
        <Node 
          key = {e.idx}
          idx = {e.idx}
          i = {e.index}
          s = {e.season}
          sj = {e.subject}
          e = {e.episode}
          star = {e.star}
          content = {e.content}
          handleUpdate = {this.updateList}
          handleDelete = {this.delList}
        />
    )
    return (
      <div>
        <label className='search' htmlFor='search'>제목으로 검색</label>
        <input type='text' id='search' value={this.state.search} onChange={this.changeSearch} placeholder='검색어'/>
        <button id='searchBtn' onClick={this.searchBtn}>검색</button>

        <form>
          <select id='idxlist' value={this.state.idxlist} onChange={this.changeIdxlist}>
            <option value='미드'>미드</option>
            <option value='한드'>한드</option>
            <option value='일드'>일드</option>
            <option value='만화'>만화</option>
            <option value='애니'>애니</option>
            <option value='소설'>소설</option>
          </select>
          <label className='subject' htmlFor='sj'>제목</label>
          <input type='text' id='sj' value={this.state.subject} onChange={this.changeSubject} placeholder='제목'/>
          <label className='sesean' htmlFor='ss'>시즌(부)</label>
          <input type='text' id='ss' value={this.state.season} onChange={this.changeSeason} placeholder='시즌'/>
          <label className='episode' htmlFor='ep'>에피소드(권)</label>
          <input type='text' id='ep' value={this.state.episode} onChange={this.changeEpisode} placeholder='에피'/>
          <label className='star' htmlFor='st'>별점</label>
          <input type='text' id='st' value={this.state.star} onChange={this.changeStar} placeholder='별점'/>
          <textarea id='content' value={this.state.content} onChange={this.changeContent} placeholder='감상을 적어 주세요'></textarea>
          <button type='submit' onClick={this.addList}>확인</button>
          <button id='cancel' onClick={this.reset}>초기화</button>
        </form>
        {lists}
      </div>
    );
  }
}

export default App;
