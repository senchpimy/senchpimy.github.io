---
title: "Rust en RiscV"
date: "05 Dec 2023"
---

Este es una guia basada en [esta guia](https://barretts.club/posts/i-got-a-milkv-duo/).

Suponiendo que ya se tiene el *milk V* con linux instalado y acceso a una terminal.

Primero hay que descargar o compilar el toolchain para compilar rust en riscv, yo lo compile para evitar errores de compatibilidad

## Compilacion

Primero hay que descargar la toolchain [desde aquí](https://github.com/kinsamanka/milkv-buildroot), al momento de escribir esto, las instrucciones para compilar están en el reademe del repositorio 
en donde después de 20 min de compilación obtuve una carpeta llamada *build* en donde se encuentran los compiladores y el linker de esta arquitectura

## Compilar en Rust

Creamos un nuevo proyecto de rust y añadimos algunas dependencias:

```sh
cargo add anyhow tokio tracing tracing-subscriber --features=tokio/rt,tokio/macros,tracing/async-await
```

Y reemplazar el archivo main.rs con la siguiente prueba:

```rs
#[tokio::main(flavor = "current_thread")]
#[tracing::instrument]
async fn main() -> anyhow::Result<()> {
    let subscriber = tracing_subscriber::FmtSubscriber::new();
    tracing::subscriber::set_global_default(subscriber)?;

    println!("Hello, world!");

    tracing::info!("Test");

    Ok(())
}
```
Y especificamos la arquitectura target en el archivo de configuración de cargo del proyecto. Este archivo debe de estar en *.cargo/config.toml* ya sea en la carpeta del proyecto o en el home del usuario
y añadimos la siguientes especificaciones al archivo

```toml
[target.riscv64gc-unknown-linux-musl]
linker = "XXXXXXXXXX/milkv-buildroot/build/host/bin/riscv64-buildroot-linux-musl-gcc.br_real"
rustflags = [
    "-C", "target-feature=-crt-static",
    "-C", "link-arg=--sysroot=XXXXXXXXXX/milkv-buildroot/sdk/host/riscv64-buildroot-linux-musl/sysroot",
    # "-C", "target-feature=+crt-static", # Uncomment me to force static compilation
    # "-C", "panic=abort", # Uncomment me to avoid compiling in panics
]

```

En donde *XXXXXXXXXX* es la carpeta en donde se encuentran estos archivos.

Y para compilarlo para la arquitectura que queremos usamos el siguiente comando:

```sh
cargo +nightly build --target riscv64gc-unknown-linux-musl -Zbuild-std --release
```

En el tutorial dice que hay que usar la versión nightly pero la versión base también me ha funcionado

Y finalmente lo movemos a nuestro milkv con el comando **scp**

```sh
 scp -O target/riscv64gc-unknown-linux-musl/release/binary root@192.168.42.1:/root/binary
```

Y en mi caso me ocurrio el siguiente error:

```sh
[root@milkv-duo]~# ./binary 
-sh: binary: not found
```
Este error ocurre por que no encuentra las librerías dinamicas. Podemos ver cuales son las librerías que este binario requiere con el siguiente comando 

```sh
readelf -l binary 
```
Yo obtengo la siguiente salida:

> 
> Elf file type is DYN (Position-Independent Executable file)
> Entry point 0x10e94
> There are 10 program headers, starting at offset 64
> 
> Program Headers:
>   Type           Offset             VirtAddr           PhysAddr
>                  FileSiz            MemSiz              Flags  Align
>   PHDR           0x0000000000000040 0x0000000000000040 0x0000000000000040
>                  0x0000000000000230 0x0000000000000230  R      0x8
>   INTERP         0x0000000000000270 0x0000000000000270 0x0000000000000270
>                  0x000000000000001a 0x000000000000001a  R      0x1
>       **\[Requesting program interpreter: /lib/ld-musl-riscv64.so.1\]**
>   RISCV_ATTRIBUT 0x000000000009095b 0x0000000000000000 0x0000000000000000
>                  0x0000000000000053 0x0000000000000000  R      0x1
>   LOAD           0x0000000000000000 0x0000000000000000 0x0000000000000000
>                  0x00000000000881e4 0x00000000000881e4  R E    0x1000
>   LOAD           0x0000000000088c68 0x0000000000089c68 0x0000000000089c68
>                  0x0000000000007c90 0x0000000000007e78  RW     0x1000
>   DYNAMIC        0x000000000008edf0 0x000000000008fdf0 0x000000000008fdf0
>                  0x0000000000000210 0x0000000000000210  RW     0x8
>   TLS            0x0000000000088c68 0x0000000000089c68 0x0000000000089c68
>                  0x0000000000000048 0x00000000000001c9  R      0x8
>   GNU_EH_FRAME   0x0000000000073668 0x0000000000073668 0x0000000000073668
>                  0x0000000000002cec 0x0000000000002cec  R      0x4
>   GNU_STACK      0x0000000000000000 0x0000000000000000 0x0000000000000000
>                  0x0000000000000000 0x0000000000000000  RW     0x10
>   GNU_RELRO      0x0000000000088c68 0x0000000000089c68 0x0000000000089c68
>                  0x0000000000006398 0x0000000000006398  R      0x1
> 
>  Section to Segment mapping:
>   Segment Sections...
>    00
>    01     .interp
>    02     .riscv.attributes
>    03     .interp .hash .gnu.hash .dynsym .dynstr .gnu.versión .gnu.version_r .rela.dyn .rela.plt .plt .text .rodata .eh_frame_hdr .eh_frame .gcc_except_table
>    04     .tdata .init_array .fini_array .data.rel.ro .dynamic .data .got .sdata .sbss .bss
>    05     .dynamic
>    06     .tdata .tbss
>    07     .eh_frame_hdr
>    08
>    09     .tdata .init_array .fini_array .data.rel.ro .dynamic

Para eso hay que encontrar la librería, con el siguiente comando

```sh
find /lib -name "**ld-musl**"
```
Yo obtuve la siguiente salida en la versión 1.0.6

```sh
/lib/ld-musl-riscv64v0p7_xthead.so.1
```

Entonces solo linkeamos las dos ubicaciones

```sh
ln -sf /lib/ld-musl-riscv64v0p7_xthead.so.1 /lib/ld-musl-riscv64.so.1
```

Y asi ya se pueden ejecutar programas de rust en el milkv
