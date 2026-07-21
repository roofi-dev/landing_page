<?php

namespace App\Services;

use Cloudinary\Cloudinary;
use Cloudinary\Configuration\Configuration;
use Exception;
use Illuminate\Support\Facades\Log;

class CloudinaryService
{
    protected ?Cloudinary $cloudinary = null;

    public function __construct()
    {
    }

    protected function cloudinary(): Cloudinary
    {
        if ($this->cloudinary === null) {
            $config = Configuration::instance();
            $config->cloud->cloudName = config('services.cloudinary.cloud_name');
            $config->cloud->apiKey = config('services.cloudinary.api_key');
            $config->cloud->apiSecret = config('services.cloudinary.api_secret');
            $config->url->secure = true;

            $this->cloudinary = new Cloudinary($config);
        }

        return $this->cloudinary;
    }

    public function upload(string $filePath, string $folder = 'ladang-lima'): array
    {
        $result = $this->cloudinary()->uploadApi()->upload($filePath, [
            'folder' => $folder,
            'resource_type' => 'auto',
            'quality' => 'auto',
            'fetch_format' => 'auto',
        ]);

        return [
            'public_id' => $result['public_id'],
            'secure_url' => $result['secure_url'],
            'resource_type' => $result['resource_type'],
            'width' => $result['width'] ?? null,
            'height' => $result['height'] ?? null,
            'bytes' => $result['bytes'] ?? null,
            'format' => $result['format'] ?? null,
        ];
    }

    public function destroy(string $publicId, string $resourceType = 'image'): bool
    {
        try {
            $result = $this->cloudinary()->uploadApi()->destroy($publicId, [
                'resource_type' => $resourceType === 'video' ? 'video' : 'image',
            ]);

            if (($result['result'] ?? null) === 'not found') {
                Log::warning("Cloudinary: asset not found for public_id: {$publicId}");
            }

            return ($result['result'] ?? null) === 'ok' || ($result['result'] ?? null) === 'not found';
        } catch (Exception $e) {
            Log::error("Cloudinary destroy failed for public_id {$publicId}: " . $e->getMessage());
            return false;
        }
    }

    public function isConfigured(): bool
    {
        return config('services.cloudinary.cloud_name')
            && config('services.cloudinary.api_key')
            && config('services.cloudinary.api_secret');
    }
}
