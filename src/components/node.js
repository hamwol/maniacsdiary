import React, { Component } from 'react';

class Node extends Component {  
    handleRemove = () => {
        this.props.handleDelete(this.props.idx)
    }
    handleUpdate = () => {
        let arr = []
        arr.push(this.props.i)
        arr.push(this.props.sj)
        arr.push(this.props.s)
        arr.push(this.props.e)
        arr.push(this.props.star)
        arr.push(this.props.content)
        arr.push(this.props.idx)

        this.props.handleUpdate(arr)
    }

    render(){    

        return(
            <div key={this.key}>
                {this.props.i}
                {this.props.sj}
                {this.props.s}
                {this.props.e}
                {this.props.star}
                {this.props.content}
                <button onClick={this.handleUpdate}>수정</button>
                <button onClick={this.handleRemove}>삭제</button>
            </div>
        )
    }

}

export default Node