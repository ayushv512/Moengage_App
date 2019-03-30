import React, { Component } from 'react';
import './CampaignList.css'

const TableHeader = () => { 
    return (
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Type</th>
                <th>Company</th>
                <th>Actions</th>
            </tr>
        </thead>
    );
}

const TableBody = props => { 
    const rows = props.campaignData.map((row, index) => {
        return (
            <tr key={index}>
                <td>
                    <input type="checkbox"/> 
                </td>
                <td>{row.name}</td>
                <td>{row.type}</td>
                <td>{row.company}</td>
                <td>
                    <button onClick={() => props.editItem(index)} className="editButtonCls">Edit</button>
                    <button onClick={() => props.removeItem(index)}>Delete</button>
                </td>
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}

class CampaignList extends Component {
    render() {
        const { campaignData, removeItem,editItem } = this.props;

        return (
            <table>
                <TableHeader />
                <TableBody campaignData={campaignData} removeItem={removeItem} editItem= {editItem}/>
            </table>
        );
    }
}

export default CampaignList;