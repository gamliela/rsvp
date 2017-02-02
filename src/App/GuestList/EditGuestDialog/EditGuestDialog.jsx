import React from 'react';
import {observer} from 'mobx-react';
import {Dialog} from 'react-toolbox/lib/dialog';
import {observable, action} from "mobx";
import {Guest} from "../../AppStore";
import {InputRTL} from "../../../shared/react-toolbox-rtl/InputRTL.jsx";

@observer
class EditGuestDialog extends React.Component {
    @observable editedGuest = new Guest(this.props.guest);

    @action updateField(name, value) {
        this.editedGuest[name] = value;
    }

    render() {
        return <Dialog
            active={this.props.active}
            title="עריכת פרטים"
            onEscKeyDown={this.props.closeEditor}
            onOverlayClick={this.props.closeEditor}>
            <InputRTL type='text' label='מספר שולחן' name='tableNumber' value={this.editedGuest.tableNumber}
                      onChange={this.updateField.bind(this, 'tableNumber')} ref={this.setFirstInput}/>
            <InputRTL type='text' label='כמות מוזמנים' name='numGuests' value={this.editedGuest.numGuests}
                      onChange={this.updateField.bind(this, 'numGuests')}/>
        </Dialog>
    }

    componentDidMount() {
        this.focusFirstInputIfActive();
    }

    componentDidUpdate() {
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
