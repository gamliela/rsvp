import React from 'react';
import {observer} from 'mobx-react';
import {Dialog as DialogRT} from 'react-toolbox/lib/dialog';
import {DialogStore} from "./DialogStore";

const Dialog = observer(({store}) =>
    <DialogRT
        actions={this.actions}
        active={this.state.active}
        onEscKeyDown={this.handleToggle}
        onOverlayClick={this.handleToggle}
        title='My awesome dialog'
    >
        <p>Here you can add arbitrary content. Components like Pickers are using dialogs now.</p>
    </DialogRT>
);

const globalStore = new DialogStore();

const GlobalDialog = () =>
    <Dialog store={globalStore}></Dialog>;

export default GlobalDialog;