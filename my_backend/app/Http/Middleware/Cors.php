<?php
// app/Http/Middleware/Cors.php
namespace App\Http\Middleware;
use Closure;

class Cors
{
    public function handle($request, Closure $next)
    {
        // Gérer les requêtes OPTIONS (preflight)
        if ($request->getMethod() == "OPTIONS") {
            return response('', 200)
                ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        }

        return $next($request)
            ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    }
}