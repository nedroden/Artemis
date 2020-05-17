<?php

namespace App\Http\Middleware;

use App\PermissionSet;
use Closure;
use Illuminate\Support\Facades\Auth;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, string $permissionName)
    {
        if (Auth::guest()) {
            $permissionSet = PermissionSet::findOrFail(4);

            abort_if(!in_array($permissionName, $permissionSet->permissions()), 403, 'Access denied');
        }

        if (!$request->user()->hasPermission($permissionName)) {
            abort(403, 'Access denied');
        }

        return $next($request);
    }
}
