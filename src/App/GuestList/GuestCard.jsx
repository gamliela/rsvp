import React from 'react';
import {observer} from 'mobx-react';
import {Card, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';
import style from "./style.scss";
import {observable, action, extendObservable} from "mobx";
import EditGuestDialog from './EditGuestDialog/EditGuestDialog.jsx'

@observer
class GuestCard extends React.Component {
    @observable editorOpened = false;

    @action.bound openEditor() {
        this.editorOpened = true;
    }

    @action.bound closeEditor() {
        this.editorOpened = false;
    }

    render() {
        let guest = this.props.guest;

        let editDialog = this.editorOpened && <EditGuestDialog guest={guest} active={true}
                                                               closeEditor={this.closeEditor}></EditGuestDialog>;

        return (
            <Card theme={style}>
                <CardTitle
                    title={guest.name}
                    subtitle={"שולחן " + guest.tableNumber}
                />
                <CardText>{guest.numGuests} אורחים</CardText>
                <CardActions>
                    <div className={style.filler}></div>
                    <Button icon='edit' primary mini onClick={this.openEditor}/>
                    <Button icon='done' floating primary mini/>
                </CardActions>
                {editDialog}
            </Card>
        )
    };
}

export default GuestCard;