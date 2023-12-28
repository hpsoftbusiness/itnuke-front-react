import React from 'react';

class Drugi extends React.Component {

    state = {
        imie: "Krystian",
        nazwisko: "Czekalski",
        date: new Date()
    }

    componentDidMount() {
        setInterval(()=> {
            this.setState({date: new Date()});
        })
    }

    klikam(evt) {
        console.log('klikam3', evt)
    }

    znikacz = (evt) => {
        this.setState({imie:evt.target.value});
    }

    render() {
        return (
            <div>
                <h1>{this.state.date.toString()}</h1>
                <h1 onClick={this.klikam}>Drugi komponent zaimportowany</h1>
                <h2>{this.state.imie}</h2>
                <input type="text" onChange={this.znikacz}/>
            </div>
        )
    }
}

export default Drugi;