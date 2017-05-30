import React from 'react';
import {observer} from 'mobx-react';
import {Card, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card';
import {ProgressBar} from 'react-toolbox/lib/progress_bar';
import {Button} from 'react-toolbox/lib/button';
import style from "./style.scss";
import {observable, action, extendObservable} from "mobx";
import EditGuestDialog from './EditGuestDialog/EditGuestDialog.jsx'
import config from "../../shared/config/config";

@observer
class GuestCard extends React.Component {
    @observable editorOpened = false;

    @action.bound openEditor() {
        this.editorOpened = true;
    };

    @action.bound closeEditor() {
        this.editorOpened = false;
    };

    onDoneClick = () => {
        this.props.guest.saveDefault();
    };

    render() {
        const guest = this.props.guest;
        const view = guest.view;
        const editDialog = this.editorOpened && <EditGuestDialog guest={guest} active={true}
                                                                 closeEditor={this.closeEditor}></EditGuestDialog>;
        const editAllowed = config.editAllowed && !guest.isSaving;

        return (
            <Card theme={style}
                  className={`${guest.arrived && style.arrived} ${guest.isSavingError && style.isSavingError}`}>
                <CardTitle
                    title={view.name}
                    subtitle={"שולחן " + view.tableNumber}
                />
                <CardText>{view.numGuests} מוזמנים</CardText>
                <CardText>{guest.comments}</CardText>
                <CardActions>
                    <div className={style.filler}></div>
                    <span>{view.arrivalTimeTruncated}</span>
                    {editAllowed && <Button icon='edit' primary mini onClick={this.openEditor}/>}
                    {editAllowed && !guest.arrived &&
                    <Button icon='done' floating primary mini onClick={this.onDoneClick}/>}
                </CardActions>
                {guest.isSaving && <ProgressBar type="linear" mode="indeterminate" className={style.loadingBar}/>}
                {editDialog}
            </Card>
        )
    };
}

export default GuestCard;