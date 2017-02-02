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
        let view = guest.view;

        let editDialog = this.editorOpened && <EditGuestDialog guest={guest} active={true}
                                                               closeEditor={this.closeEditor}></EditGuestDialog>;

        return (
            <Card theme={style} className={view.arrivalTimeTruncated && style.arrived}>
                <CardTitle
                    title={view.name}
                    subtitle={"שולחן " + view.tableNumber}
                />
                <CardText>{view.numGuests} מוזמנים</CardText>
                <CardActions>
                    <div className={style.filler}></div>
                    <span>{view.arrivalTimeTruncated}</span>
                    <Button icon='edit' primary mini onClick={this.openEditor}/>
                    {!view.arrivalTimeTruncated && <Button icon='done' floating primary mini/>}
                </CardActions>
                {editDialog}
            </Card>
        )
    };
}

export default GuestCard;