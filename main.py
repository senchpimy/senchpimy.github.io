import re
import subprocess
import sys
import tempfile
import shutil
import os

# --- CONFIGURACIÓN ---
# Nombre del archivo Markdown. Sensible a mayúsculas en Linux.
NOMBRE_ARCHIVO = "README.md"

# Comando para lanzar el navegador en Linux.
# 'chromium-browser' o 'chromium' son los más comunes.
COMANDO_NAVEGADOR = "chromium"
# ---------------------


def extraer_urls_portfolio(nombre_archivo):
    """
    Lee un archivo Markdown y extrae todos los enlaces de portfolio válidos.
    Busca el patrón: '- [Texto del enlace](URL)' y filtra los que no son HTTP/HTTPS.
    """
    if not os.path.exists(nombre_archivo):
        print(f"Error: No se pudo encontrar el archivo '{nombre_archivo}'.")
        print(
            "Asegúrate de que el archivo está en la misma carpeta que el script y el nombre es correcto."
        )
        return None

    with open(nombre_archivo, "r", encoding="utf-8") as f:
        contenido = f.read()

    # Expresión regular para encontrar enlaces en una lista de Markdown: '- [texto](url)'
    regex = r"^\s*[-*]\s+\[.*?\]\((.*?)\)"
    urls_encontradas = re.findall(regex, contenido, re.MULTILINE)

    # Filtramos para quedarnos solo con enlaces web externos
    urls_validas = [url for url in urls_encontradas if url.startswith("http")]

    return urls_validas


def abrir_urls_secuencialmente(urls, ejecutable):
    """
    Para cada URL, lanza una instancia AISLADA de Chromium y espera a que se cierre.
    """
    total_urls = len(urls)
    if not urls:
        print("No se encontraron URLs de portfolios válidas en el archivo.")
        return

    print(
        f"Se encontraron {total_urls} portfolios. Se abrirán uno por uno en ventanas aisladas."
    )
    print("=" * 60)

    for i, url in enumerate(urls, 1):
        # 1. Crear un directorio de perfil de usuario temporal y único
        # Esto fuerza a Chromium a crear una instancia completamente nueva y separada.
        temp_profile_dir = tempfile.mkdtemp(prefix="chromium_profile_")

        print(f"[{i}/{total_urls}] Abriendo: {url}")
        print(f"Directorio de perfil temporal: {temp_profile_dir}")
        print(">> CIERRA ESTA NUEVA VENTANA DEL NAVEGADOR PARA CONTINUAR <<")

        # 2. Construir el comando para lanzar Chromium en modo aislado
        comando = [
            ejecutable,
            f"--user-data-dir={temp_profile_dir}",  # Clave para aislar el proceso
            "--new-window",  # Asegura que sea una ventana nueva
            url,
        ]

        try:
            # 3. Ejecutar el comando. Python esperará aquí hasta que el proceso termine.
            # Cuando cierras la ventana, el proceso de Chromium termina y run() concluye.
            subprocess.run(
                comando,
                check=True,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )

            print("Ventana cerrada. Procediendo con la siguiente...\n")

        except FileNotFoundError:
            print(f"\nERROR: Comando '{ejecutable}' no encontrado.")
            print(
                "Asegúrate de que Chromium está instalado y de que 'COMANDO_NAVEGADOR' está bien configurado en el script."
            )
            sys.exit(1)
        except subprocess.CalledProcessError as e:
            print(f"Ocurrió un error con Chromium: {e}")
            # Continuamos con el siguiente, por si fue un problema de una URL específica
        finally:
            # 4. Limpieza: Borrar el directorio de perfil temporal, pase lo que pase.
            shutil.rmtree(temp_profile_dir, ignore_errors=True)

    print("=" * 60)
    print("¡Has revisado todos los portfolios! Fin del script.")


# --- Punto de entrada del script ---
if __name__ == "__main__":
    lista_urls = extraer_urls_portfolio(NOMBRE_ARCHIVO)
    if lista_urls is not None:
        abrir_urls_secuencialmente(lista_urls, COMANDO_NAVEGADOR)
