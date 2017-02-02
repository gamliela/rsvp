import React from 'react';
import {observer} from 'mobx-react';
import {Dialog} from 'react-toolbox/lib/dialog';
import {observable, action} from "mobx";
import {InputRTL} from "../../../shared/react-toolbox-rtl/InputRTL.jsx";

const padding = function (s) {
    s += "";
    return s.length === 1 ? "0" + s : s;
};

const createEditedGuest = function (guest) {
    let res = guest.view;
    let now = new Date();
    if (!res.arrivalTimeTruncated)
        res.arrivalTimeTruncated = padding(now.getHours()) + ":" + padding(now.getMinutes())
    return res;
};

@observer
class EditGuestDialog extends React.Component {
    @observable editedGuest = createEditedGuest(this.props.guest);

    @action updateField(name, value) {
        this.editedGuest[name] = value;
    }

    save = () => {
        this.props.guest.update(this.editedGuest);
        this.props.closeEditor();
    };

    dialogActions = [
        { label: "ביטול", onClick: this.props.closeEditor },
        { label: "שמירה", onClick: this.save }
    ];

    render() {
        return <Dialog
            active={this.props.active}
            actions={this.dialogActions}
            title="עריכת פרטים"
            onEscKeyDown={this.props.closeEditor}
            onOverlayClick={this.props.closeEditor}>
            <InputRTL type="text" label="מספר שולחן" name="tableNumber" value={this.editedGuest.tableNumber}
                      onChange={this.updateField.bind(this, 'tableNumber')} ref={this.setFirstInput}/>
            <InputRTL type="text" label="כמות מוזמנים" name="numGuests" value={this.editedGuest.numGuests}
                      onChange={this.updateField.bind(this, 'numGuests')}/>
            <InputRTL type="text" label="זמן הגעה" name="arrivalTimeTruncated"
                      value={this.editedGuest.arrivalTimeTruncated}
                      onChange={this.updateField.bind(this, 'arrivalTimeTruncated')}/>
            <InputRTL type="text" label="טופל ע&quot;י" name="handledBy"
                      value={this.editedGuest.handledBy}
                      onChange={this.updateField.bind(this, 'handledBy')}/>
        </Dialog>
    }

    componentDidMount() {
        this.focusFirstInputIfActive();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.active)
            this.focusFirstInputIfActive();
    }

    firstInput = null;

    setFirstInput = (input) => {
        this.firstInput = input && input.wrappedInstance;
    };

    focusFirstInputIfActive = () => {
        this.firstInput && this.props.active && this.firstInput.focus();
    }

}

export default EditGuestDialog;
