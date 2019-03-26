import {Request, Response} from 'express';

export function error400(req: Request, res: Response, values: Array<String> = [], msg: string = null): void {
    req.statusCode = 400;
    if (!msg) {
        msg = 'La requête n\'est pas correcte';
    }
    if (values && values.length > 0) {
        msg += ', veuillez renseigner les champs suivants: ';
        for (let i = 0; i < values.length; i++) {
            msg += values[i];
            if (i < values.length - 1) {
                msg += ', ';
            }
        }
    }
    res.json({
        msg: msg
    });
}

export function error401(req: Request, res: Response): void {
    req.statusCode = 401;
    res.json({
        msg: 'Veuillez vous authentifier'
    });
}

export function error403(req: Request, res: Response): void {
    req.statusCode = 403;
    res.json({
        msg: 'Vous n\'avez pas l\'accès à cette route'
    });
}

export function error404(req: Request, res: Response, HTMLresponse: boolean = false): void {
    req.statusCode = 404;
    if (HTMLresponse) {
        res.render('404');
    } else {
        res.json({
            msg: 'Cette route n\'existe pas'
        });
    }
}

export function error500(req: Request, res: Response): void {
    req.statusCode = 500;
    res.json({
        msg: 'Une erreur inattendue s\'est produite'
    });
}
