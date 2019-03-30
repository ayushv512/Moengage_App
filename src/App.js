import React, { Component } from 'react';
import Modal from 'react-modal';
import CampaignList from './components/CampaignList';
import './App.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class App extends Component {
    constructor() {
        super();
        this.state = {
            campaignList: [],
            campaignListToDisplay: [],
            modalIsOpen: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }


    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    componentWillMount() {
        fetch('/data/dummyData.json')
            .then(response => response.json())
            .then((response) => {
                this.setState({
                    campaignList: response,
                    campaignListToDisplay: response
                })
            })
            .catch((error) => {
                console.error(error);
            })
    }

    removeItem = index => {
        const { campaignList } = this.state;

        this.setState({
            campaignList: campaignList.filter((item, i) => {
                return i !== index;
            })
        });
    }

    onSearchByName = e => {
        this.setState({
            campaignListToDisplay: this.state.campaignList.filter(campaign => (new RegExp(e.target.value, "i")).test(campaign.name))
        });
    }

    editItem = () => {
        this.setState({
            ModalDetails: {
                name: "",
                type: "",
                company: ""
            }
        })
        this.openModal();
    }

    render() {
        const { campaignListToDisplay } = this.state;

        return (
            <div className="container">
                <h2>Campaign List</h2>
                <div className="searchCls">
                    <input type="text" placeholder="Search by Campaign Name" className="textboxCls" onChange={this.onSearchByName.bind(this)} />
                </div>
                <CampaignList
                    campaignData={campaignListToDisplay}
                    removeItem={this.removeItem}
                    editItem={this.editItem}
                />
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Edit Modal"
                >

                    <h2 ref={subtitle => this.subtitle = subtitle}>Edit</h2>
                    <button onClick={this.closeModal}>close</button>
                    <form>
                        <label>
                            Name
                        </label>
                        <input />
                        <label>
                            Type
                        </label>
                        <input />
                        <label>
                            Company
                        </label>
                        <input />
                    </form>
                </Modal>
            </div>
        );
    }
}

export default App;