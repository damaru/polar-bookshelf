import * as React from "react";
import { deepMemo } from "../react/ReactUtils";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import clsx from "clsx";
import {SIDENAV_WIDTH} from "./SideNav";
import Tooltip from "@material-ui/core/Tooltip";
import {URLPathStr} from "polar-shared/src/url/PathToRegexps";
import { useLocation } from "react-router-dom";

const BORDER = 3;

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: `${SIDENAV_WIDTH}px`,
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
            marginBottom: theme.spacing(1)
        },
        button: {

            borderLeftWidth: `${BORDER}`,
            borderLeftStyle: 'solid',
            borderLeftColor: 'transparent',

            borderRightWidth: `${BORDER}`,
            borderRightStyle: 'solid',
            borderRightColor: 'transparent',

            '&:hover': {
                borderLeftColor: theme.palette.secondary.light
            },

        },
        activeButton: {
            borderLeftColor: theme.palette.secondary.dark,
        },
    }),
);

interface IProps {
    readonly tabID: number;
    readonly title: string;

    /**
     * The URL path to signal when this button is active.
     */
    readonly path: URLPathStr;

    readonly canonicalizer?: (path: URLPathStr) => URLPathStr;

    readonly onClick: () => void;
    readonly children: JSX.Element;
    readonly className?: string;
}

export const ActiveTabButton = deepMemo((props: IProps) => {

    const classes = useStyles();

    const canonicalize = React.useCallback((path: URLPathStr) => {

        if (props.canonicalizer) {
            return props.canonicalizer(path);
        }

        return path;

    }, [props]);

    const location = useLocation();

    const canonicalLocationPath = React.useMemo(() => canonicalize(location.pathname), [canonicalize, location.pathname]);
    const canonicalPath = React.useMemo(() => canonicalize(props.path), [canonicalize, props.path]);

    const active = canonicalLocationPath === canonicalPath;

    return (

        <Tooltip title={props.title}
                 arrow={false}
                 placement="right"
                 disableTouchListener={true}
                 disableFocusListener={true}
                 enterNextDelay={0}
                 enterDelay={0}
                 leaveDelay={0}>

            <div className={clsx(classes.root, classes.button, active && classes.activeButton, props.className)}
                 onClick={props.onClick}>

                {props.children}

            </div>

        </Tooltip>
    );

});
