/**
 * The `tagfield` is a combo box improved for multiple value editing, selection and easy
 * management.
 *
 * ### Histroy
 *
 * Inspired by the [SuperBoxSelect component for ExtJS 3](http://technomedia.co.uk/SuperBoxSelect/examples3.html),
 * which in turn was inspired by the [BoxSelect component for ExtJS 2](http://efattal.fr/en/extjs/extuxboxselect/).
 *
 * Various contributions and suggestions made by many members of the ExtJS community which can be seen
 * in the [user extension forum post](http://www.sencha.com/forum/showthread.php?134751-Ext.ux.form.field.BoxSelect).
 *
 * By: kvee_iv http://www.sencha.com/forum/member.php?29437-kveeiv
 */
Ext.define('Ext.form.field.Tag', {
    extend:'Ext.form.field.ComboBox',
    requires: [
        'Ext.selection.Model',
        'Ext.data.Store',
        'Ext.data.ChainedStore'
    ],

    xtype: 'tagfield',
    /**
     * @cfg {String} valueParam
     * The name of the parameter used to load unknown records into the store. If left unspecified, {@link #valueField}
     * will be used.
     */

    /**
     * @cfg {Boolean} multiSelect
     * If set to `true`, allows the combo field to hold more than one value at a time, and allows selecting multiple
     * items from the dropdown list. The combo's text field will show all selected values using the template
     * defined by {@link #labelTpl}.
     *
     */
    multiSelect: true,

    /**
     * @cfg {String/Ext.XTemplate} labelTpl
     * The [XTemplate](http://docs.sencha.com/ext-js/4-1/#!/api/Ext.XTemplate) to use for the inner
     * markup of the labelled items. Defaults to the configured {@link #displayField}
     */

    /**
     * @cfg
     * @inheritdoc
     *
     * When {@link #forceSelection} is `false`, new records can be created by the user as they
     * are typed. These records are **not** added to the combo's store. This creation
     * is triggered by typing the configured 'delimiter', and can be further configured using the
     * {@link #createNewOnEnter} and {@link #createNewOnBlur} configuration options.
     *
     * This functionality is primarily useful for things such as an email address.
     */
    forceSelection: true,

    /**
     * @cfg {Boolean} createNewOnEnter
     * Has no effect if {@link #forceSelection} is `true`.
     *
     * With this set to `true`, the creation described in
     * {@link #forceSelection} will also be triggered by the 'enter' key.
     */
    createNewOnEnter: false,

    /**
     * @cfg {Boolean} createNewOnBlur
     * Has no effect if {@link #forceSelection} is `true`.
     *
     * With this set to `true`, the creation described in
     * {@link #forceSelection} will also be triggered when the field loses focus.
     *
     * Please note that this behavior is also affected by the configuration options
     * {@link #autoSelect} and {@link #selectOnTab}. If those are true and an existing
     * item would have been selected as a result, the partial text the user has entered will
     * be discarded and the existing item will be added to the selection.
     */
    createNewOnBlur: false,

    /**
     * @cfg {Boolean} encodeSubmitValue
     * Has no effect if {@link #multiSelect} is `false`.
     *
     * Controls the formatting of the form submit value of the field as returned by {@link #getSubmitValue}
     *
     * - `true` for the field value to submit as a json encoded array in a single GET/POST variable
     * - `false` for the field to submit as an array of GET/POST variables
     */
    encodeSubmitValue: false,

    /**
     * @cfg {Boolean} triggerOnClick
     * `true` to activate the trigger when clicking in empty space in the field. Note that the
     * subsequent behavior of this is controlled by the field's {@link #triggerAction}.
     * This behavior is similar to that of a basic ComboBox with {@link #editable} `false`.
     */
    triggerOnClick: true,

    /**
     * @cfg {Boolean} stacked
     * - `true` to have each selected value fill to the width of the form field
     * - `false to have each selected value size to its displayed contents
     */
    stacked: false,

    /**
     * @cfg {Boolean} pinList
     * Has no effect if {@link #multiSelect} is `false`
     *
     * `true` to keep the pick list expanded after each selection from the pick list
     * `false` to automatically collapse the pick list after a selection is made
     */
    pinList: true,

    /**
     * @cfg {Boolean} filterPickList
     * True to hide the currently selected values from the drop down list.
     *
     * - `true` to hide currently selected values from the drop down pick list
     * - `false` to keep the item in the pick list as a selected item
     */
    filterPickList: false,

    /**
     * @cfg {Boolean}
     *
     * `true` if this field should automatically grow and shrink vertically to its content.
     * Note that this overrides the natural trigger grow functionality, which is used to size
     * the field horizontally.
     */
    grow: true,

    /**
     * @cfg {Number/Boolean}
     * Has no effect if {@link #grow} is `false`
     *
     * The minimum height to allow when {@link #grow} is `true`, or `false` to allow for
     * natural vertical growth based on the current selected values. See also {@link #growMax}.
     */
    growMin: false,

    /**
     * @cfg {Number/Boolean}
     * Has no effect if {@link #grow} is `false`
     *
     * The maximum height to allow when {@link #grow} is `true`, or `false` to allow for
     * natural vertical growth based on the current selected values. See also {@link #growMin}.
     */
    growMax: false,

    /**
     * @cfg
     * @inheritdoc
     */
    selectOnFocus: true,

    /**
     * @cfg growAppend
     * @hide
     * Currently unsupported since this is used for horizontal growth and this component
     * only supports vertical growth.
     */

    /**
     * @cfg growToLongestValue
     * @hide
     * Currently unsupported since this is used for horizontal growth and this component
     * only supports vertical growth.
     */

    /**
     * @event autosize
     * Fires when the **{@link #autoSize}** function is triggered and the field is resized according to the
     * {@link #grow}/{@link #growMin}/{@link #growMax} configs as a result. This event provides a hook for the
     * developer to apply additional logic at runtime to resize the field if needed.
     * @param {Ext.form.field.Tag} this This field
     * @param {Number} height The new field height
     */

    /**
     * @private
     */
    fieldSubTpl: [
        '<div id="{cmpId}-listWrapper" data-ref="listWrapper" class="' + Ext.baseCSSPrefix + 'tagfield {fieldCls} {typeCls} {typeCls}-{ui} style="{wrapperStyle}">',
            '<ul id="{cmpId}-itemList" data-ref="itemList" class="' + Ext.baseCSSPrefix + 'tagfield-list{itemListCls}">',
                '<li id="{cmpId}-inputElCt" data-ref="inputElCt" class="' + Ext.baseCSSPrefix + 'tagfield-input">',
                    '<div id="{cmpId}-emptyEl" data-ref="emptyEl" class="{emptyCls}">{emptyText}</div>',
                    '<input id="{cmpId}-inputEl" data-ref="inputEl" type="{type}" ',
                    '<tpl if="name">name="{name}" </tpl>',
                    '<tpl if="value"> value="{[Ext.util.Format.htmlEncode(values.value)]}"</tpl>',
                    '<tpl if="size">size="{size}" </tpl>',
                    '<tpl if="tabIdx != null">tabindex="{tabIdx}" </tpl>',
                    '<tpl if="disabled"> disabled="disabled"</tpl>',
                    'class="' + Ext.baseCSSPrefix + 'tagfield-input-field {inputElCls}" autocomplete="off">',
                '</li>',
            '</ul>',
        '</div>',
        {
            disableFormats: true
        }
    ],

    extraFieldBodyCls: Ext.baseCSSPrefix + 'tagfield-body',

    /**
     * @private
     */
    childEls: [ 'listWrapper', 'itemList', 'inputEl', 'inputElCt', 'emptyEl' ],

    /**
     * @private
     */
    emptyInputCls: Ext.baseCSSPrefix + 'tagfield-emptyinput',

    tagItemSelector: '.' + Ext.baseCSSPrefix + 'tagfield-item',
    tagItemCloseSelector: '.' + Ext.baseCSSPrefix + 'tagfield-item-close',
    tagSelectedCls: Ext.baseCSSPrefix + 'tagfield-item-selected',

    initComponent: function() {
        var me = this,
            typeAhead = me.typeAhead,
            delimiter = me.delimiter;

        // <debug>
        if (typeAhead && !me.editable) {
            Ext.Error.raise('If typeAhead is enabled the combo must be editable: true -- please change one of those settings.');
        }
        // </debug>

        me.typeAhead = false;

        // Refresh happens upon select.
        me.listConfig = Ext.apply({
            refreshSelmodelOnRefresh: false
        }, me.listConfig);

        // Create the selModel before calling parent, we need it to be available
        // when we bind the store.
        me.selectionModel = new Ext.selection.Model({
            mode: 'MULTI',
            onSelectChange: function(record, isSelected, suppressEvent, commitFn) {
                commitFn();
            }
        });

        me.callParent();

        me.typeAhead = typeAhead;

        if (delimiter && me.multiSelect) {
            me.delimiterRegexp = new RegExp(Ext.String.escapeRegex(delimiter));
        }
    },

    initEvents: function() {
        var me = this;

        me.callParent(arguments);

        if (!me.enableKeyEvents) {
            me.inputEl.on('keydown', me.onKeyDown, me);
        }
        me.inputEl.on('paste', me.onPaste, me);
        me.listWrapper.on('click', me.onItemListClick, me);

        // Relay these selection events passing the field instead of exposing the underlying selection model
        me.selectionModel.on({
            scope: me,
            selectionchange: me.onSelectionChange,
            focuschange: me.onFocusChange
        });
    },

    initValue: function() {
        this.callParent();
        this.syncValueStore(this.value);
    },

    getPickerStore: function() {
        return this.pickerStore;
    },

    onBindStore: function(store) {
        var me = this,
            filter = me.selectedFilter,
            picker = me.picker,
            valueStore;

        if (store) {
            me.valueStore = valueStore = new Ext.data.Store({
                model: store.getModel()
            });
            valueStore.on('datachanged', me.onValueStoreChange, me);
            me.selectionModel.bindStore(valueStore);

            if (me.filterPickList) {
                me.listFilter = new Ext.util.Filter({
                    scope: me,
                    filterFn: me.filterPicked
                });
                me.pickerStore = new Ext.data.ChainedStore({
                    source: store,
                    filters: [me.listFilter]
                });
            } else {
                me.pickerStore = store;
            }

            if (picker) {
                picker.bindStore(me.pickerStore);
            }

        }
    },

    filterPicked: function(rec) {
        return !this.valueStore.contains(rec);
    },

    onUnbindStore: function(store) {
        var me = this,
            valueStore = me.valueStore,
            picker = me.picker;

        if (picker) {
            picker.bindStore(null);
        }

        if (valueStore) {
            valueStore.destroy();
            me.valueStore = null;
        }

        if (me.filterPickList) {
            me.pickerStore.destroy();
        }
        me.pickerStore = null;
        me.callParent(arguments);
    },

    onValueStoreChange: function() {
        var me = this;
        if (me.filterPickList) {
            me.pickerStore.getFilters().add(me.listFilter);
        }
        me.applyMultiselectItemMarkup();
    },

    onSelectionChange: function(selModel, selectedRecs) {
        this.applyMultiselectItemMarkup();
        this.fireEvent('valueselectionchange', this, selectedRecs);
    },

    onFocusChange: function(selectionModel, oldFocused, newFocused) {
        this.fireEvent('valuefocuschange', this, oldFocused, newFocused);
    },

    createPicker: function() {
        var me = this,
            picker = me.callParent(arguments);

        me.mon(picker, 'beforerefresh', me.onBeforeListRefresh, me);
        return picker;
    },

    onDestroy: function() {
        this.selectionModel = Ext.destroy(this.selectionModel);

        // This will unbind the store, which will destroy the valueStore
        this.callParent(arguments);
    },

    getSubTplData: function(fieldData) {
        var me = this,
            data = me.callParent(arguments),
            emptyText = me.emptyText,
            emptyInputCls = me.emptyInputCls,
            isEmpty = emptyText && data.value.length < 1,
            growMin = me.growMin,
            growMax = me.growMax;

        data.value = '';
        data.emptyText = isEmpty ? emptyText : '';
        data.emptyCls = isEmpty ? me.emptyCls : emptyInputCls;
        data.inputElCls = isEmpty ? emptyInputCls : '';
        data.wrapperStyle = '';
        data.itemListCls = '';

        if (me.grow) {
            if (Ext.isNumber(growMin) && growMin > 0) {
                wrapperStyle += 'min-height:' + growMin + 'px;';
            }
            if (Ext.isNumber(growMax) && growMax > 0) {
                wrapperStyle += 'max-height:' + growMax + 'px;';
            }
        }

        if (me.stacked === true) {
            data.itemListCls += ' ' + Ext.baseCSSPrefix + 'tagfield-stacked';
        }

        if (!me.multiSelect) {
            data.itemListCls += ' ' + Ext.baseCSSPrefix + 'tagfield-singleselect';
        }

        return data;
    },

    afterRender: function() {
        var me = this,
            inputEl = me.inputEl;

        if (Ext.supports.Placeholder && inputEl && me.emptyText) {
            inputEl.dom.removeAttribute('placeholder');
        }

        me.applyMultiselectItemMarkup();

        me.callParent(arguments);
    },

    findRecord: function(field, value) {
        var matches = this.getStore().queryRecords(field, value);
        return matches.length ? matches[0] : false;
    },

    getInValueStore: function(value) {
        var valueStore = this.valueStore,
            index = valueStore.findExact(me.valueField, value);

        return index === -1 ? null : valueStore.getAt(index);
    },

    onLoad: function() {
        var me = this,
            valueField = me.valueField,
            valueStore = me.valueStore,
            changed, data, len, i, rec, index;

        if (valueStore) {
            if (!Ext.isEmpty(me.value) && (valueStore.getCount() === 0)) {
                me.setValue(me.value, false, true);
            }

            // This portion of the code is to keep the record instances in
            // sync
            valueStore.suspendEvents();
            data = valueStore.getData().items;

            for (i = 0, len = data.length; i < len; ++i) {
                rec = me.findRecord(valueField, data[i].get(valueField)),
                index = rec ? valueStore.indexOf(rec) : -1;
                if (i > -1) {
                    valueStore.removeAt(i);
                    valueStore.insert(i, rec);
                    changed = true;
                }
            }
            valueStore.resumeEvents();
            if (changed) {
                me.onValueStoreChange();
            }
        }

        me.callParent(arguments);
    },

    /**
     * Used to determine if a record is filtered out of the current store's data set,
     * for determining if a currently selected value should be retained.
     *
     * Slightly complicated logic. A record is considered filtered and should be retained if:
     *
     * - It is not in the combo store and the store has no filter or it is in the filtered data set
     *   (Happens when our selected value is just part of a different load, page or query)
     * - It is not in the combo store and forceSelection is false and it is in the value store
     *   (Happens when our selected value was created manually)
     *
     * @private
     */
    isFilteredRecord: function(record) {
        var me = this,
            store = me.getStore(),
            valueField = me.valueField,
            recordValue = record.get(valueField),
            storeRecord = store.findExact(valueField, recordValue),
            filtered;

        // Not in the store
        if (storeRecord === -1) {
            filtered = !me.forceSelection && me.getInValueStore(recordValue);
        }

        return !!filtered;
    },

    /**
     * @inheritdoc
     *
     * Overridden to allow for continued querying with multiSelect selections already made
     * @protected
     */
    doRawQuery: function() {
        var me = this,
            rawValue = me.inputEl.dom.value;

        if (me.multiSelect) {
            rawValue = rawValue.split(me.delimiter).pop();
        }

        me.doQuery(rawValue, false, true);
    },

    /**
     * When the picker is refreshing, we should ignore selection changes. Otherwise
     * the value of our field will be changing just because our view of the choices is.
     * @protected
     */
    onBeforeListRefresh: function() {
        this.ignoreSelection++;
    },

    /**
     * When the picker is refreshing, we should ignore selection changes. Otherwise
     * the value of our field will be changing just because our view of the choices is.
     * @protected
     */
    onListRefresh: function() {
        this.callParent(arguments);
        if (this.ignoreSelection > 0) {
            --this.ignoreSelection;
        }
    },

    /**
     * Overridden to preserve current labelled items when list is filtered/paged/loaded
     * and does not include our current value. See {@link #isFilteredRecord}
     * @private
     */
    onListSelectionChange: function(list, selectedRecords) {
        var me = this,
            valueStore = me.valueStore,
            mergedRecords = [],
            len, data, len, i, rec;

        // Only react to selection if it is not called from setValue, and if our list is
        // expanded (ignores changes to the selection model triggered elsewhere)
        if (!me.ignoreSelection && me.isExpanded) {
            // Pull forward records that were already selected or are now filtered out of the store
            data = valueStore.getData().items;
            for (i = 0, len = data.length; i < len; ++i) {
                rec = data[i];
                if (Ext.Array.contains(selectedRecords, rec) || me.isFilteredRecord(rec)) {
                    mergedRecords.push(rec);
                }
            }
            mergedRecords = Ext.Array.merge(mergedRecords, selectedRecords);

            len = Ext.Array.intersect(mergedRecords, valueStore.getRange()).length;
            if (len !== mergedRecords.length || len !== valueStore.getCount()) {
                me.setValue(mergedRecords, false);
                if (!me.multiSelect || !me.pinList) {
                    me.collapse();
                }
                if (valueStore.getCount() > 0) {
                    me.fireEvent('select', me, valueStore.getRange());
                }
            }
            if (!me.pinList) {
                me.inputEl.dom.value = '';
            }
            // If not using touch interactions, focus the input
            if (!Ext.supports.TouchEvents) {
                me.inputEl.focus();
                if (me.selectOnFocus) {
                    me.inputEl.dom.select();
                }
            }
        }
    },

    /**
     * Overridden to use valueStore instead of valueModels, for inclusion of
     * filtered records. See {@link #isFilteredRecord}
     * @private
     */
    syncSelection: function() {
        var me = this,
            picker = me.picker,
            valueField = me.valueField,
            valueStore = me.valueStore,
            store = me.getStore(),
            selection, selModel,
            len, i, data, index;

        if (picker) {
            // From the value, find the Models that are in the store's current data
            selection = [];
            if (valueStore) {
                data = valueStore.getData().items;
                for (i = 0, len = data.length; i < len; ++i) {
                    index = store.findExact(valueField, data[i].get(valueField));
                    if (i > -1) {
                        selection.push(store.getAt(index));
                    }
                }
            }

            // Update the selection to match
            me.ignoreSelection++;
            selModel = picker.getSelectionModel();
            selModel.deselectAll();
            if (selection.length > 0) {
                selModel.select(selection);
            }
            if (me.ignoreSelection > 0) {
                --me.ignoreSelection;
            }
        }
    },

    /**
     * Get the current cursor position in the input field, for key-based navigation
     * @private
     */
    getCursorPosition: function() {
        var cursorPos;

        if (document.selection) {
            cursorPos = document.selection.createRange();
            cursorPos.collapse(true);
            cursorPos.moveStart('character', -this.inputEl.dom.value.length);
            cursorPos = cursorPos.text.length;
        } else {
            cursorPos = this.inputEl.dom.selectionStart;
        }
        return cursorPos;
    },

    /**
     * Check to see if the input field has selected text, for key-based navigation
     * @private
     */
    hasSelectedText: function() {
        var inputEl = this.inputEl.dom,
            sel, range;

        if (document.selection) {
            sel = document.selection;
            range = sel.createRange();
            return (range.parentElement() === inputEl);
        } else {
            return inputEl.selectionStart !== inputEl.selectionEnd;
        }
    },

    /**
     * Handles keyDown processing of key-based selection of labelled items.
     * Supported keyboard controls:
     *
     * - If pick list is expanded
     *
     *     - `CTRL-A` will select all the items in the pick list
     *
     * - If the cursor is at the beginning of the input field and there are values present
     *
     *     - `CTRL-A` will highlight all the currently selected values
     *     - `BACKSPACE` and `DELETE` will remove any currently highlighted selected values
     *     - `RIGHT` and `LEFT` will move the current highlight in the appropriate direction
     *     - `SHIFT-RIGHT` and `SHIFT-LEFT` will add to the current highlight in the appropriate direction
     *
     * @protected
     */
    onKeyDown: function(e) {
        var me = this,
            key = e.getKey(),
            inputEl = me.inputEl,
            rawValue = inputEl.dom.value,
            valueStore = me.valueStore,
            selModel = me.selectionModel,
            stopEvent = false,
            lastSelectionIndex;

        if (me.readOnly || me.disabled || !me.editable) {
            return;
        }

        if (me.isExpanded && key === e.A && e.ctrlKey) {
            // CTRL-A when picker is expanded - add all items in current picker store page to current value
            me.select(me.getStore().getRange());
            selModel.deselectAll();
            me.collapse();
            inputEl.focus();
            stopEvent = true;
        }
        // We have some values and (no input text or cursor is at left of all text)
        else if (valueStore.getCount() > 0 && (rawValue === '' || (me.getCursorPosition() === 0 && !me.hasSelectedText()))) {
            // Keyboard navigation of current values
            lastSelectionIndex = (selModel.getCount() > 0) ? valueStore.indexOf(selModel.getLastSelected()) : -1;

            
            if (key === e.BACKSPACE || key === e.DELETE) {
                // Delete token
                if (lastSelectionIndex > -1) {
                    if (selModel.getCount() > 1) {
                        lastSelectionIndex = -1;
                    }
                    valueStore.remove(selModel.getSelection());
                } else {
                    valueStore.remove(valueStore.last());
                }
                selModel.clearSelections();
                me.setValue(valueStore.getRange());
                if (lastSelectionIndex > 0) {
                    selModel.select(lastSelectionIndex - 1);
                } else if (valueStore.getCount()) {
                    selModel.select(0);
                }
                stopEvent = true;
            } else if (key === e.RIGHT || key === e.LEFT) {
                // Navigate and select tokens
                if (lastSelectionIndex === -1 && key === e.LEFT) {
                    selModel.select(valueStore.last());
                    stopEvent = true;
                } else if (lastSelectionIndex > -1) {
                    if (key === e.RIGHT) {
                        if (lastSelectionIndex < (valueStore.getCount() - 1)) {
                            selModel.select(lastSelectionIndex + 1, e.shiftKey);
                            stopEvent = true;
                        } else if (!e.shiftKey) {
                            selModel.deselectAll();
                            stopEvent = true;
                        }
                    } else if (key === e.LEFT && (lastSelectionIndex > 0)) {
                        selModel.select(lastSelectionIndex - 1, e.shiftKey);
                        stopEvent = true;
                    }
                }
            } else if (key === e.A && e.ctrlKey) {
                // Select all tokens
                selModel.selectAll();
                stopEvent = e.A;
            }
            inputEl.focus();
        }

        if (stopEvent) {
            me.preventKeyUpEvent = stopEvent;
            e.stopEvent();
            return;
        }

        // Prevent key up processing for enter if it is being handled by the picker
        if (me.isExpanded && key === e.ENTER && me.picker.highlightedItem) {
            me.preventKeyUpEvent = true;
        }

        if (me.enableKeyEvents) {
            me.callParent(arguments);
        }

        if (!e.isSpecialKey() && !e.hasModifier()) {
            selModel.deselectAll();
            inputEl.focus();
        }
    },

    /**
     * Handles auto-selection and creation of labelled items based on this field's
     * delimiter, as well as the keyUp processing of key-based selection of labelled items.
     * @protected
     */
    onKeyUp: function(e, t) {
        var me = this,
            inputEl = me.inputEl,
            rawValue = inputEl.dom.value,
            preventKeyUpEvent = me.preventKeyUpEvent;

        if (me.preventKeyUpEvent) {
            e.stopEvent();
            if (preventKeyUpEvent === true || e.getKey() === preventKeyUpEvent) {
                delete me.preventKeyUpEvent;
            }
            return;
        }

        if (me.multiSelect && me.delimiterRegexp && me.delimiterRegexp.test(rawValue) ||
                ((me.createNewOnEnter === true) && e.getKey() === e.ENTER)) {
            rawValue = Ext.Array.clean(rawValue.split(me.delimiterRegexp));
            inputEl.dom.value = '';
            me.setValue(me.valueStore.getRange().concat(rawValue));
            inputEl.focus();
        }

        me.callParent([e,t]);
    },

    /**
     * Handles auto-selection of labelled items based on this field's delimiter when pasting
     * a list of values in to the field (e.g., for email addresses)
     * @protected
     */
    onPaste: function(e) {
        var me = this,
            inputEl = me.inputEl,
            rawValue = inputEl.dom.value,
            clipboard = (e && e.browserEvent && e.browserEvent.clipboardData) ? e.browserEvent.clipboardData : false;

        if (me.multiSelect && me.delimiterRegexp && me.delimiterRegexp.test(rawValue)) {
            if (clipboard && clipboard.getData) {
                if (/text\/plain/.test(clipboard.types)) {
                    rawValue = clipboard.getData('text/plain');
                } else if (/text\/html/.test(clipboard.types)) {
                    rawValue = clipboard.getData('text/html');
                }
            }

            rawValue = Ext.Array.clean(rawValue.split(me.delimiterRegexp));
            inputEl.dom.value = '';
            me.setValue(me.valueStore.getRange().concat(rawValue));
            inputEl.focus();
        }
    },

    /**
     * Overridden to get and set the DOM value directly for type-ahead suggestion (bypassing get/setRawValue)
     * @protected
     */
    onTypeAhead: function() {
        var me = this,
            displayField = me.displayField,
            inputElDom = me.inputEl.dom,
            boundList = me.getPicker(),
            record = me.getStore().findRecord(displayField, inputElDom.value),
            newValue, len, selStart;

        if (record) {
            newValue = record.get(displayField);
            len = newValue.length;
            selStart = inputElDom.value.length;
            boundList.highlightItem(boundList.getNode(record));
            if (selStart !== 0 && selStart !== len) {
                inputElDom.value = newValue;
                me.selectText(selStart, newValue.length);
            }
        }
    },

    /**
     * Delegation control for selecting and removing labelled items or triggering list collapse/expansion
     * @protected
     */
    onItemListClick: function(e) {
        var me = this,
            selectionModel = me.selectionModel,
            itemEl = e.getTarget(me.tagItemSelector),
            closeEl = itemEl ? e.getTarget(me.tagItemCloseSelector) : false;

        if (me.readOnly || me.disabled) {
            return;
        }

        e.stopPropagation();

        if (itemEl) {
            if (closeEl) {
                me.removeByListItemNode(itemEl);
                if (me.valueStore.getCount() > 0) {
                    me.fireEvent('select', me, me.valueStore.getRange());
                }
            } else {
                me.toggleSelectionByListItemNode(itemEl, e.shiftKey);
            }
            // If not using touch interactions, focus the input
            if (!Ext.supports.TouchEvents) {
                me.inputEl.focus();
            }
        } else {
            if (selectionModel.getCount() > 0) {
                selectionModel.deselectAll();
            }
            if (me.triggerOnClick) {
                me.onTriggerClick();
            }
        }
    },

    /**
     * Build the markup for the labelled items. Template must be built on demand due to ComboBox initComponent
     * lifecycle for the creation of on-demand stores (to account for automatic valueField/displayField setting)
     * @private
     */
    getMultiSelectItemMarkup: function() {
        var me = this,
            cssPrefix = Ext.baseCSSPrefix,
            valueField = me.valueField;

        if (!me.multiSelectItemTpl) {
            if (!me.labelTpl) {
                me.labelTpl = '{' + me.displayField + '}';
            }
            me.labelTpl = me.getTpl('labelTpl');

            me.multiSelectItemTpl = new Ext.XTemplate([
                '<tpl for=".">',
                    '<li data-value="{[this.getItemValue(values)]}" class="' + cssPrefix + 'tagfield-item',
                    '<tpl if="this.isSelected(values)">',
                    ' ' + me.tagSelectedCls,
                    '</tpl>',
                    '{%',
                        'values = values.data;',
                    '%}',
                    '" qtip="{' + me.displayField + '}">' ,
                    '<div class="' + cssPrefix + 'tagfield-item-text">{[this.getItemLabel(values)]}</div>',
                    '<div class="' + cssPrefix + 'tagfield-item-close"></div>' ,
                    '</li>' ,
                '</tpl>',
                {
                    isSelected: function(rec) {
                        return me.selectionModel.isSelected(rec);
                    },
                    getItemLabel: function(values) {
                        return me.labelTpl.apply(values);
                    },
                    getItemValue: function(rec) {
                        return rec.get(valueField);
                    }
                }
            ]);
        }
        if (!me.multiSelectItemTpl.isTemplate) {
            me.multiSelectItemTpl = this.getTpl('multiSelectItemTpl');
        }

        return me.multiSelectItemTpl.apply(this.valueStore.getRange());
    },

    /**
     * Update the labelled items rendering
     * @private
     */
    applyMultiselectItemMarkup: function() {
        var me = this,
            itemList = me.itemList,
            item;

        if (itemList) {
            while ((item = me.inputElCt.prev())) {
                item.destroy();
            }
            me.inputElCt.insertHtml('beforeBegin', me.getMultiSelectItemMarkup());
        }

        // Before control returns from this event, align the picker and ensure the input area of
        // this control is in view.
        Ext.GlobalEvents.on({
            idle: function() {
                if (me.picker && me.isExpanded) {
                    me.alignPicker();
                }
                if (me.hasFocus && me.inputElCt && me.listWrapper) {
                    me.inputElCt.scrollIntoView(me.listWrapper);
                }
            },
            single: true
        });
    },

    /**
     * Returns the record from valueStore for the labelled item node
     */
    getRecordByListItemNode: function(itemEl) {
        var me = this,
            itemIdx = 0,
            searchEl = me.itemList.dom.firstChild;

        while (searchEl && searchEl.nextSibling) {
            if (searchEl == itemEl) {
                break;
            }
            itemIdx++;
            searchEl = searchEl.nextSibling;
        }
        itemIdx = (searchEl == itemEl) ? itemIdx : false;

        if (itemIdx === false) {
            return false;
        }

        return me.valueStore.getAt(itemIdx);
    },

    /**
     * Toggle of labelled item selection by node reference
     */
    toggleSelectionByListItemNode: function(itemEl, keepExisting) {
        var me = this,
            rec = me.getRecordByListItemNode(itemEl),
            selModel = me.selectionModel;

        if (rec) {
            if (selModel.isSelected(rec)) {
                selModel.deselect(rec);
            } else {
                selModel.select(rec, keepExisting);
            }
        }
    },

    /**
     * Removal of labelled item by node reference
     */
    removeByListItemNode: function(itemEl) {
        var me = this,
            rec = me.getRecordByListItemNode(itemEl);

        if (rec) {
            me.valueStore.remove(rec);
            me.setValue(me.valueStore.getRange());
        }
    },

    /**
     * @inheritdoc
     * Intercept calls to getRawValue to pretend there is no inputEl for rawValue handling,
     * so that we can use inputEl for user input of just the current value.
     */
    getRawValue: function() {
        var me = this,
            inputEl = me.inputEl,
            result;

        me.inputEl = false;
        result = me.callParent(arguments);
        me.inputEl = inputEl;
        return result;
    },

    /**
     * @inheritdoc
     * Intercept calls to setRawValue to pretend there is no inputEl for rawValue handling,
     * so that we can use inputEl for user input of just the current value.
     */
    setRawValue: function(value) {
        var me = this,
            inputEl = me.inputEl,
            result;

        me.inputEl = false;
        result = me.callParent([value]);
        me.inputEl = inputEl;

        return result;
    },

    /**
     * Adds a value or values to the current value of the field
     * @param {Mixed} value The value or values to add to the current value, see {@link #setValue}
     */
    addValue: function(value) {
        var me = this;
        if (value) {
            me.setValue(Ext.Array.merge(me.value, Ext.Array.from(value)));
        }
    },

    /**
     * Removes a value or values from the current value of the field
     * @param {Mixed} value The value or values to remove from the current value, see {@link #setValue}
     */
    removeValue: function(value) {
        var valueField = this.valueField,
            len, i, item;

        if (value) {
            value = Ext.Array.from(value);
            for (i = 0, len = value.length; i < len; ++i) {
                item = value[i];
                if (item.isModel) {
                    value[i] = item.get(valueField);
                }
            }
            this.setValue(Ext.Array.difference(this.value, value));
        }
    },

    /**
     * Sets the specified value(s) into the field. The following value formats are recognised:
     *
     * - Single Values
     *
     *     - A string associated to this field's configured {@link #valueField}
     *     - A record containing at least this field's configured {@link #valueField} and {@link #displayField}
     *
     * - Multiple Values
     *
     *     - If {@link #multiSelect} is `true`, a string containing multiple strings as
     *       specified in the Single Values section above, concatenated in to one string
     *       with each entry separated by this field's configured {@link #delimiter}
     *     - An array of strings as specified in the Single Values section above
     *     - An array of records as specified in the Single Values section above
     *
     * In any of the string formats above, the following occurs if an associated record cannot be found:
     *
     * 1. If {@link #forceSelection} is `false`, a new record of the {@link #store}'s configured model type
     *    will be created using the given value as the {@link #displayField} and {@link #valueField}.
     *    This record will be added to the current value, but it will **not** be added to the store.
     * 2. If {@link #forceSelection} is `true` and {@link #queryMode} is `remote`, the list of unknown
     *    values will be submitted as a call to the {@link #store}'s load as a parameter named by
     *    the {@link #valueParam} with values separated by the configured {@link #delimiter}.
     *    ** This process will cause setValue to asynchronously process. ** This will only be attempted
     *    once. Any unknown values that the server does not return records for will be removed.
     * 3. Otherwise, unknown values will be removed.
     *
     * @param {Mixed} value The value(s) to be set, see method documentation for details
     * @return {Ext.form.field.Field/Boolean} this, or `false` if asynchronously querying for unknown values
     */
    setValue: function(value, /* private */ doSelect, skipLoad) {
        var me = this,
            valueStore = me.valueStore,
            valueField = me.valueField,
            unknownValues = [],
            store = me.store,
            record, len, i, valueRecord, cls, params, store;

        if (Ext.isEmpty(value)) {
            value = null;
        }
        if (Ext.isString(value) && me.multiSelect) {
            value = value.split(me.delimiter);
        }
        value = Ext.Array.from(value, true);

        for (i = 0, len = value.length; i < len; i++) {
            record = value[i];
            if (!record || !record.isModel) {
                valueRecord = valueStore.findExact(valueField, record);
                if (valueRecord > -1) {
                    value[i] = valueStore.getAt(valueRecord);
                } else {
                    valueRecord = me.findRecord(valueField, record);
                    if (!valueRecord) {
                        if (me.forceSelection) {
                            unknownValues.push(record);
                        } else {
                            valueRecord = {};
                            valueRecord[me.valueField] = record;
                            valueRecord[me.displayField] = record;

                            cls = me.valueStore.getModel();
                            valueRecord = new cls(valueRecord);
                        }
                    }
                    if (valueRecord) {
                        value[i] = valueRecord;
                    }
                }
            }
        }

        if (!store.isEmptyStore && skipLoad !== true && unknownValues.length > 0 && me.queryMode === 'remote') {
            params = {};
            params[me.valueParam || me.valueField] = unknownValues.join(me.delimiter);
            store.load({
                params: params,
                callback: function() {
                    if (me.itemList) {
                        me.itemList.unmask();
                    }
                    me.setValue(value, doSelect, true);
                    me.autoSize();
                    me.lastQuery = false;
                }
            });
            return false;
        }

        // For single-select boxes, use the last good (formal record) value if possible
        if (!me.multiSelect && value.length > 0) {
            for (i = value.length - 1; i >= 0; i--) {
                if (value[i].isModel) {
                    value = value[i];
                    break;
                }
            }
            if (Ext.isArray(value)) {
                value = value[value.length - 1];
            }
        }

        return me.callParent([value, doSelect]);
    },

    /**
     * Returns the records for the field's current value
     * @return {Array} The records for the field's current value
     */
    getValueRecords: function() {
        return this.valueStore.getRange();
    },

    /**
     * @inheritdoc
     * Overridden to optionally allow for submitting the field as a json encoded array.
     */
    getSubmitData: function() {
        var me = this,
            val = me.callParent(arguments);

        if (me.multiSelect && me.encodeSubmitValue && val && val[me.name]) {
            val[me.name] = Ext.encode(val[me.name]);
        }

        return val;
    },

    /**
     * Overridden to handle partial-input selections more directly
     */
    assertValue: function() {
        var me = this,
            rawValue = me.inputEl.dom.value,
            rec = !Ext.isEmpty(rawValue) ? me.findRecordByDisplay(rawValue) : false,
            value = false;

        if (!rec && !me.forceSelection && me.createNewOnBlur && !Ext.isEmpty(rawValue)) {
            value = rawValue;
        } else if (rec) {
            value = rec;
        }

        if (value) {
            me.addValue(value);
        }

        me.inputEl.dom.value = '';

        me.collapse();
    },

    
    onChange: function(newValue) {
        this.syncValueStore(newValue);
        this.callParent(arguments);
    },

    syncValueStore: function(value) {
        var me = this,
            len = value.length,
            valueField = me.valueField,
            valueStore = me.valueStore,
            i, rec;

        if (valueStore) {
            valueStore.suspendEvents();
            valueStore.removeAll();

            for (i = 0; i < len; ++i) {
                rec = me.findRecord(valueField, value[i]);
                valueStore.add(rec);
            }
            valueStore.resumeEvents();
            me.onValueStoreChange();
        }
    },

    /**
     * Overridden to be more accepting of varied value types
     */
    isEqual: function(v1, v2) {
        var fromArray = Ext.Array.from,
            valueField = this.valueField,
            i, len, t1, t2;

        v1 = fromArray(v1);
        v2 = fromArray(v2);
        len = v1.length;

        if (len !== v2.length) {
            return false;
        }

        for(i = 0; i < len; i++) {
            t1 = v1[i].isModel ? v1[i].get(valueField) : v1[i];
            t2 = v2[i].isModel ? v2[i].get(valueField) : v2[i];
            if (t1 !== t2) {
                return false;
            }
        }

        return true;
    },

    /**
     * Overridden to use value (selection) instead of raw value and to avoid the use of placeholder
     */
    applyEmptyText : function() {
        var me = this,
            emptyText = me.emptyText,
            emptyEl = me.emptyEl,
            inputEl = me.inputEl,
            listWrapper = me.listWrapper,
            emptyCls = me.emptyCls,
            emptyInputCls = me.emptyInputCls,
            isEmpty;

        if (me.rendered && emptyText) {
            isEmpty = Ext.isEmpty(me.value) && !me.hasFocus;
            if (isEmpty) {
                inputEl.dom.value = '';
                emptyEl.setHtml(emptyText);
                emptyEl.addCls(emptyCls);
                emptyEl.removeCls(emptyInputCls);
                listWrapper.addCls(emptyCls);
                inputEl.addCls(emptyInputCls);
            } else {
                emptyEl.addCls(emptyInputCls);
                emptyEl.removeCls(emptyCls);
                listWrapper.removeCls(emptyCls);
                inputEl.removeCls(emptyInputCls);
            }
            me.autoSize();
        }
    },

    /**
     * Overridden to use inputEl instead of raw value and to avoid the use of placeholder
     */
    preFocus : function(){
        var me = this,
            inputEl = me.inputEl,
            isEmpty = inputEl.dom.value === '';

        me.emptyEl.addCls(me.emptyInputCls);
        me.emptyEl.removeCls(me.emptyCls);
        me.listWrapper.removeCls(me.emptyCls);
        me.inputEl.removeCls(me.emptyInputCls);

        if (me.selectOnFocus || isEmpty) {
            inputEl.dom.select();
        }
    },

    /**
     * Intercept calls to onFocus to add focusCls, because the base field
     * classes assume this should be applied to inputEl
     */
    onFocus: function() {
        var me = this,
            focusCls = me.focusCls,
            itemList = me.itemList;

        if (focusCls && itemList) {
            itemList.addCls(focusCls);
        }

        me.callParent(arguments);
    },

    /**
     * Intercept calls to onBlur to remove focusCls, because the base field
     * classes assume this should be applied to inputEl
     */
    onBlur: function() {
        var me = this,
            focusCls = me.focusCls,
            itemList = me.itemList;

        if (focusCls && itemList) {
            itemList.removeCls(focusCls);
        }

        me.callParent(arguments);
    },

    /**
     * Intercept calls to renderActiveError to add invalidCls, because the base
     * field classes assume this should be applied to inputEl
     */
    renderActiveError: function() {
        var me = this,
            invalidCls = me.invalidCls,
            itemList = me.itemList,
            hasError = me.hasActiveError();

        if (invalidCls && itemList) {
            itemList[hasError ? 'addCls' : 'removeCls'](me.invalidCls + '-field');
        }

        me.callParent(arguments);
    },

    /**
     * Initiate auto-sizing for height based on {@link #grow}, if applicable.
     */
    autoSize: function() {
        var me = this;

        if (me.grow && me.rendered) {
            me.autoSizing = true;
            me.updateLayout();
        }

        return me;
    },

    /**
     * Track height change to fire {@link #event-autosize} event, when applicable.
     */
    afterComponentLayout: function() {
        var me = this,
            height;

        if (me.autoSizing) {
            height = me.getHeight();
            if (height !== me.lastInputHeight) {
                if (me.isExpanded) {
                    me.alignPicker();
                }
                me.fireEvent('autosize', me, height);
                me.lastInputHeight = height;
                me.autoSizing = false;
            }
        }
    }
});