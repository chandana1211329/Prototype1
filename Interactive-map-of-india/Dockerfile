# Use official PHP with Apache image
FROM php:8.2-apache

# Set working directory
WORKDIR /var/www/html

# Copy all application files
COPY . .

# Enable Apache rewrite module for clean URLs
RUN a2enmod rewrite

# Configure Apache to serve index.php as directory index
RUN echo "DirectoryIndex index.php index.html" > /etc/apache2/conf-available/custom-directory-index.conf && \
    a2enconf custom-directory-index

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html

# Expose port 80
EXPOSE 80

# Start Apache in foreground
CMD ["apache2-foreground"]
