import React from 'react';
import {observer} from 'mobx-react';
import {Dialog} from 'react-toolbox/lib/dialog';
import {observable, action} from "mobx";
import {InputRTL} from "../../../shared/react-toolbox-rtl/InputRTL.jsx";
import {truncateSeconds, nowString} from "../../../shared/util";
import config from "../../../shared/config/config.js";

const createEditedGuest = function (guest) {
    const view = guest.view;
    if (!view.arrivalTimeTruncated)
        view.arrivalTimeTruncated = truncateSeconds(nowString());
    if (!view.handledBy)
        view.handledBy = config.operatorName;
    return view;
};

@observer
class EditGuestDialog extends React.Component {
    @observable editedGuest = createEditedGuest(this.props.guest);

    @action updateField(name, value) {
        this.editedGuest[name] = value;
    }

    save = () => {
        this.props.guest.save(this.editedGuest);
        this.props.closeEditor();
    };

    dialogActions = [
        {label: "ביטול", onClick: this.props.closeEditor},
        {label: "שמירה", onClick: this.save}
    ];

    render() {
        return <Dialog
            active={this.props.active}
            actions={this.dialogActions}
            title="עריכת פרטים"
            onEscKeyDown={this.props.closeEditor}
            onOverlayClick={this.props.closeEditor}>
            <InputRTL type="text" label="מספר שולחן" name="tableNumber" value={this.editedGuest.tableNumber}
                      onChange={this.updateField.bind(this, 'tableNumber')} innerRef={this.setFirstInput}/>
            <InputRTL type="text" label="כמות מוזמנים" name="numGuests" value={this.editedGuest.numGuests}
                      onChange={this.updateField.bind(this, 'numGuests')}/>
            <InputRTL type="text" label="זמן הגעה" name="arrivalTimeTruncated"
                      value={this.editedGuest.arrivalTimeTruncated}
                      onChange={this.updateField.bind(this, 'arrivalTimeTruncated')}/>
            <InputRTL type="text" label="טופל ע&quot;י" name="handledBy"
                      value={this.editedGuest.handledBy}
                      onChange={this.updateField.bind(this, 'handledBy')}/>
            <InputRTL type="text" label="הערות" name="comments"
                      value={this.editedGuest.comments}
                      multiline={true}
                      onChange={this.updateField.bind(this, 'comments')}/>
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
