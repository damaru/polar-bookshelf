import {NoteIDStr, useNotesStore} from "./store/NotesStore";
import * as React from "react";
import { observer } from "mobx-react-lite"

interface IProps {
    readonly id: NoteIDStr;
}

export const NoteActivation = observer(function NoteActivation(props: IProps) {

    const {id} = props

    // useLifecycleTracer('useNoteActivation', {id});

    const store = useNotesStore();

    const noteActivated = store.getNoteActivated(id);

    const hasFocusRef = React.useRef(true);

    // FIXME: all of this code is now super deprecated...

    // const jumpToEditorStartPosition = React.useCallback(() => {
    //
    //     if (editorMutator) {
    //         editorMutator.setCursorPosition(0);
    //     }
    //
    // }, [editorMutator]);

    // const jumpToEditorEndPosition = React.useCallback(() => {
    //     if (editorMutator) {
    //         editorMutator.setCursorPosition('end');
    //     }
    // }, [editorMutator]);
    //
    // React.useEffect(() => {
    //
    //     if (noteActivated) {
    //
    //         if (!hasFocusRef.current) {
    //
    //             // console.log("Focusing editor for note: " + id, noteActivated.note.content)
    //
    //             switch (noteActivated.activePos) {
    //                 case "start":
    //                     jumpToEditorStartPosition();
    //                     break;
    //                 case "end":
    //                     jumpToEditorEndPosition();
    //                     break;
    //             }
    //
    //             hasFocusRef.current = true;
    //
    //         }
    //
    //     } else {
    //         // we are no longer active.
    //         hasFocusRef.current = false;
    //     }
    //
    // }, [jumpToEditorEndPosition, jumpToEditorStartPosition, noteActivated, id]);

    return null;

});
