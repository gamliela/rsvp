import React from 'react';
import {observer} from 'mobx-react';
import {AppBar} from 'react-toolbox/lib/app_bar';
import {FontIcon} from 'react-toolbox/lib/font_icon';
import {InputRTL} from "../../shared/react-toolbox-rtl/InputRTL.jsx";
import {Clock} from "./Clock/Clock.jsx";
import {CheckboxRTL} from "../../shared/react-toolbox-rtl/CheckboxRTL.jsx";
import style from "./style.scss";

const Header = observer(({title, filter, updateFilter, totalArrived, totalGuests}) => {

    let onQueryChange = s => updateFilter({...filter, query: s});
    let onMissingOnlyChange = b => updateFilter({...filter, missingOnly: b});

    return (
        <AppBar title={title} theme={style}>
            <FontIcon className={style.clear} value={filter.query && "clear"} onClick={onQueryChange.bind(this, '')}></FontIcon>
            <InputRTL type='text' value={filter.query} onChange={onQueryChange} theme={style}/>
            <CheckboxRTL checked={filter.missingOnly} theme={style} onChange={onMissingOnlyChange} label="חסרים בלבד"/>
            <div className={style.counter}>הגיעו: {totalArrived}/{totalGuests}</div>
            <div className={style.info}>
                <Clock></Clock>
            </div>
        </AppBar>
    );
});

export default Header;