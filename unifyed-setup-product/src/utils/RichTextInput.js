/* eslint-disable react-hooks/exhaustive-deps */
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import viewToPlainText from "@ckeditor/ckeditor5-clipboard/src/utils/viewtoplaintext";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useEffect, useRef, useState } from "react";

// const useStyles = makeStyles((theme) => ({
//   richTextInputWrapper: {
//     position: "relative",
//     "&.expanded": {
//       padding: "16px",
//     },
//     "& .ck.ck-content.ck-editor__editable": {
//       minHeight: "200px",
//     },
//     "& .ck.ck-dropdown__panel": {
//       maxHeight: "200px",
//       overflowY: "auto",
//     },
//     "&.expanded .ck.ck-content.ck-editor__editable": {
//       minHeight: `calc(100vh - 138px)`,
//     },
//   },
//   expandBtnWrapper: {
//     display: "inline-block",
//     position: "absolute",
//     top: "-40px",
//     right: "0px",
//     cursor: "pointer",
//   },
//   mapFullScreenDialogContainer: {
//     "&>div": {
//       height: "calc(100% - 64px)",
//     },
//     position: "relative",
//   },
// }));

const getMarkdownFromEditorState = (editorState) => {
  if (editorState) {
    const html = editorState.getData();
    return html || "";
  }
  return "";
};

const getPlainTextFromEditorState = (editorState) => {
  if (editorState) {
    const text = viewToPlainText(editorState.editing.view.document.getRoot());
    return text || "";
  }
  return "";
};

const RichTextInput = (props) => {
  const { value, onChange, onBlur, textLimit, errorMessage } = props;
  const editorWrapperRef = useRef(null);
  const editorRef = useRef(null);
  const [expandView] = useState(false);
  const [textCount, setTextCount] = useState(0);
  const [editorHtml, setEditorHtml] = useState(value);
  const [fieldErrorMsg, setFieldErrorMsg] = useState(null);

  useEffect(() => {
    if (!!editorHtml && textCount === 0) {
      const divElement = document.createElement("div");
      divElement.innerHTML = editorHtml;
      const textValue = divElement.textContent;
      setTextCount(textValue.length);
    }
  }, []);

  const onEditorStateChange = (newEditorState) => {
    let html = getMarkdownFromEditorState(newEditorState);
    setEditorHtml(html);
  };

  const onEditorBlur = (event, editorState) => {
    const html = getMarkdownFromEditorState(editorState);
    let plainTextVal = getPlainTextFromEditorState(editorState);
    if (!!html) {
      const divElement = document.createElement("div");
      divElement.innerHTML = html;
      plainTextVal = divElement.textContent;
    }
    onChange && onChange(html, plainTextVal);
    onBlur && onBlur(editorState);
    if (editorWrapperRef.current) {
      editorWrapperRef.current.focus();
    }
  };

  useEffect(() => {
    if (value !== editorHtml) {
      setEditorHtml(() => value);
    }
  }, [value]);

  // const onOpenDialog = (evt) => {
  //   evt.preventDefault();
  //   setExpandView(true);
  // };

  // const onCloseDialog = (evt) => {
  //   evt.preventDefault();
  //   setExpandView(false);
  // };

  const editorHTMLComp = (
    <div
    // ref={editorWrapperRef}
    // className={classnames(classes.richTextInputWrapper, {
    //   expanded: expandView,
    // })}
    >
      <CKEditor
        editor={ClassicEditor}
        data={editorHtml}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          editorRef.current = editor;
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          const divElement = document.createElement("div");
          divElement.innerHTML = data;
          const textValue = divElement.textContent;
          setTextCount(textValue.length);
          if (textValue.length > textLimit) {
            setFieldErrorMsg(
              errorMessage
                ? errorMessage
                : `Remarks exceed ${textLimit} characters!`
            );
          } else {
            setFieldErrorMsg(null);
          }
          onEditorStateChange(editor);
        }}
        onBlur={onEditorBlur}
      />
      <div>
        <b>Character Count:</b> {textCount} / <b>{textLimit}</b>
      </div>
      {!!fieldErrorMsg ? (
        <div
          className={`Mui-error MuiFormHelperText-root`}
          style={{ marginLeft: "0px" }}
        >
          {fieldErrorMsg}
        </div>
      ) : (
        <></>
      )}
      {/* {!expandView && (
        <div className={classes.expandBtnWrapper} onClick={onOpenDialog}>
          <Button color="primary">Expand</Button>
        </div>
      )} */}
    </div>
  );

  if (!expandView) {
    return editorHTMLComp;
  }

  return { editorHTMLComp };
};

export default RichTextInput;
